const crypto = require("node:crypto");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Allow-Methods": "GET, POST, PATCH, OPTIONS",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function parseBody(event) {
  try {
    return JSON.parse(event.body || "{}");
  } catch (error) {
    return null;
  }
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function validatePasswordStrength(password) {
  return typeof password === "string" && password.length >= 8;
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { salt, hash };
}

function verifyPassword(password, expectedHash, salt) {
  if (!password || !expectedHash || !salt) return false;

  const computed = crypto.scryptSync(password, salt, 64).toString("hex");
  const expectedBuffer = Buffer.from(expectedHash, "hex");
  const actualBuffer = Buffer.from(computed, "hex");

  if (expectedBuffer.length !== actualBuffer.length) return false;
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(value) {
  const padded = String(value || "")
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(String(value || "").length / 4) * 4, "=");

  return Buffer.from(padded, "base64").toString("utf8");
}

function signToken(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const data = `${encodedHeader}.${encodedPayload}`;

  const signature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${data}.${signature}`;
}

function verifyToken(token, secret) {
  const parts = String(token || "").split(".");
  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [encodedHeader, encodedPayload, encodedSignature] = parts;
  const data = `${encodedHeader}.${encodedPayload}`;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  const expectedBuffer = Buffer.from(expectedSignature);
  const actualBuffer = Buffer.from(String(encodedSignature || ""));

  if (expectedBuffer.length !== actualBuffer.length) {
    throw new Error("Invalid token signature");
  }

  if (!crypto.timingSafeEqual(expectedBuffer, actualBuffer)) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(base64UrlDecode(encodedPayload));
  const now = Math.floor(Date.now() / 1000);

  if (typeof payload.exp === "number" && payload.exp < now) {
    throw new Error("Token has expired");
  }

  return payload;
}

function parseAuthBearer(event) {
  const rawHeader =
    event?.headers?.authorization || event?.headers?.Authorization || "";
  const match = String(rawHeader).match(/^Bearer\s+(.+)$/i);
  return match ? match[1].trim() : "";
}

function requireTeacherAuth(event) {
  const secret = String(process.env.TEACHER_AUTH_SECRET || "").trim();
  if (!secret) {
    throw new Error("TEACHER_AUTH_SECRET is not configured");
  }

  const token = parseAuthBearer(event);
  if (!token) {
    throw new Error("Missing bearer token");
  }

  const payload = verifyToken(token, secret);
  if (payload.role !== "teacher") {
    throw new Error("Invalid token role");
  }

  return payload;
}

function getSupabaseConfig() {
  const url = String(process.env.SUPABASE_URL || "").trim();
  const serviceKey = String(process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim();

  if (!url || !serviceKey) {
    return null;
  }

  return { url, serviceKey };
}

async function supabaseRequest(path, { method = "GET", body } = {}) {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("Supabase credentials are not configured");
  }

  const response = await fetch(`${config.url}${path}`, {
    method,
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase error ${response.status}: ${details}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function countTableRows(tableName) {
  const config = getSupabaseConfig();
  if (!config) {
    throw new Error("Supabase credentials are not configured");
  }

  const response = await fetch(`${config.url}/rest/v1/${tableName}?select=id&limit=1`, {
    method: "GET",
    headers: {
      apikey: config.serviceKey,
      Authorization: `Bearer ${config.serviceKey}`,
      Prefer: "count=exact",
    },
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Supabase count error ${response.status}: ${details}`);
  }

  const contentRange = String(response.headers.get("content-range") || "");
  const match = contentRange.match(/\/(\d+)$/);
  return match ? Number(match[1]) : 0;
}

async function findTeacherByEmail(email) {
  const query = new URLSearchParams({
    select: "id,email,full_name,password_hash,password_salt,created_at",
    email: `eq.${email}`,
    limit: "1",
  }).toString();

  const rows = await supabaseRequest(`/rest/v1/teacher_accounts?${query}`);
  if (!Array.isArray(rows) || !rows.length) {
    return null;
  }

  return rows[0];
}

async function insertTeacherAccount({ fullName, email, passwordHash, passwordSalt }) {
  const payload = {
    full_name: fullName,
    email,
    password_hash: passwordHash,
    password_salt: passwordSalt,
  };

  const rows = await supabaseRequest("/rest/v1/teacher_accounts", {
    method: "POST",
    body: payload,
  });

  return Array.isArray(rows) ? rows[0] : rows;
}

module.exports = {
  corsHeaders,
  json,
  parseBody,
  normalizeEmail,
  validatePasswordStrength,
  hashPassword,
  verifyPassword,
  signToken,
  verifyToken,
  getSupabaseConfig,
  supabaseRequest,
  requireTeacherAuth,
  findTeacherByEmail,
  insertTeacherAccount,
  countTableRows,
};

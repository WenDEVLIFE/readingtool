const {
  corsHeaders,
  json,
  parseBody,
  normalizeEmail,
  validatePasswordStrength,
  hashPassword,
  findTeacherByEmail,
  insertTeacherAccount,
  countTableRows,
} = require("./_teacher-auth-utils");

const MAX_TEACHER_ACCOUNTS = 15;

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  const payload = parseBody(event);
  if (!payload) {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  const fullName = String(payload.fullName || "").trim();
  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!fullName) {
    return json(400, { ok: false, error: "Teacher full name is required" });
  }

  if (!email) {
    return json(400, { ok: false, error: "Email is required" });
  }

  if (!validatePasswordStrength(password)) {
    return json(400, { ok: false, error: "Password must be at least 8 characters" });
  }

  try {
    const teacherCount = await countTableRows("teacher_accounts");
    if (teacherCount >= MAX_TEACHER_ACCOUNTS) {
      return json(429, {
        ok: false,
        error: `Teacher registration limit reached (${MAX_TEACHER_ACCOUNTS} accounts max)`,
      });
    }

    const existing = await findTeacherByEmail(email);
    if (existing) {
      return json(409, { ok: false, error: "Teacher account already exists for this email" });
    }

    const { salt, hash } = hashPassword(password);

    await insertTeacherAccount({
      fullName,
      email,
      passwordHash: hash,
      passwordSalt: salt,
    });

    return json(201, {
      ok: true,
      teacher: {
        email,
        fullName,
      },
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: "Teacher registration failed",
      details: String(error?.message || error),
    });
  }
};

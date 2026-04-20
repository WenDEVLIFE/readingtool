const {
  corsHeaders,
  json,
  parseBody,
  normalizeEmail,
  verifyPassword,
  signToken,
  findTeacherByEmail,
} = require("./_teacher-auth-utils");

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

  const email = normalizeEmail(payload.email);
  const password = String(payload.password || "");

  if (!email || !password) {
    return json(400, { ok: false, error: "Email and password are required" });
  }

  try {
    const teacher = await findTeacherByEmail(email);
    if (!teacher) {
      return json(401, { ok: false, error: "Invalid email or password" });
    }

    const isValidPassword = verifyPassword(password, teacher.password_hash, teacher.password_salt);
    if (!isValidPassword) {
      return json(401, { ok: false, error: "Invalid email or password" });
    }

    const secret = String(process.env.TEACHER_AUTH_SECRET || "").trim();
    if (!secret) {
      return json(500, { ok: false, error: "TEACHER_AUTH_SECRET is not configured" });
    }

    const now = Math.floor(Date.now() / 1000);
    const token = signToken(
      {
        sub: String(teacher.id),
        role: "teacher",
        email: teacher.email,
        iat: now,
        exp: now + 60 * 60 * 12,
      },
      secret
    );

    return json(200, {
      ok: true,
      token,
      teacher: {
        id: teacher.id,
        fullName: teacher.full_name,
        email: teacher.email,
      },
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: "Teacher login failed",
      details: String(error?.message || error),
    });
  }
};

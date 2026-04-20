const {
  corsHeaders,
  json,
  parseBody,
  supabaseRequest,
} = require("./_teacher-auth-utils");

function normalizeStudentName(value) {
  return String(value || "").trim();
}

function normalizeNameKey(value) {
  return normalizeStudentName(value).toLowerCase();
}

function normalizeLevel(value) {
  const upper = String(value || "").trim().toUpperCase();
  if (!["EASY", "MEDIUM", "HARD"].includes(upper)) {
    return "";
  }
  return upper;
}

async function findStudentByNameKey(nameKey) {
  const query = new URLSearchParams({
    select: "id,full_name,normalized_name",
    normalized_name: `eq.${nameKey}`,
    limit: "1",
  }).toString();

  const rows = await supabaseRequest(`/rest/v1/student_profiles?${query}`);
  if (!Array.isArray(rows) || !rows.length) {
    return null;
  }

  return rows[0];
}

async function createStudent(fullName, nameKey) {
  const rows = await supabaseRequest("/rest/v1/student_profiles", {
    method: "POST",
    body: {
      full_name: fullName,
      normalized_name: nameKey,
    },
  });

  return Array.isArray(rows) ? rows[0] : rows;
}

async function createAttempt({ studentId, level, passageTitle }) {
  const rows = await supabaseRequest("/rest/v1/student_exam_attempts", {
    method: "POST",
    body: {
      student_id: studentId,
      level,
      passage_title: String(passageTitle || "").trim(),
      started_at: new Date().toISOString(),
    },
  });

  return Array.isArray(rows) ? rows[0] : rows;
}

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

  const fullName = normalizeStudentName(payload.studentName);
  const nameKey = normalizeNameKey(payload.studentName);
  const level = normalizeLevel(payload.level);
  const passageTitle = String(payload.passageTitle || "").trim();

  if (!fullName) {
    return json(400, { ok: false, error: "Student name is required" });
  }

  if (!level) {
    return json(400, { ok: false, error: "Valid level is required" });
  }

  try {
    let student = await findStudentByNameKey(nameKey);
    if (!student) {
      student = await createStudent(fullName, nameKey);
    }

    const attempt = await createAttempt({
      studentId: student.id,
      level,
      passageTitle,
    });

    return json(201, {
      ok: true,
      student: {
        id: student.id,
        fullName: student.full_name,
      },
      attempt: {
        id: attempt.id,
        level: attempt.level,
        passageTitle: attempt.passage_title,
      },
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: "Student attempt start failed",
      details: String(error?.message || error),
    });
  }
};

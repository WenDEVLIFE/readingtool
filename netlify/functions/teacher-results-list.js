const {
  corsHeaders,
  json,
  requireTeacherAuth,
  supabaseRequest,
} = require("./_teacher-auth-utils");

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "GET") {
    return json(405, { ok: false, error: "Method not allowed" });
  }

  try {
    requireTeacherAuth(event);
  } catch (error) {
    return json(401, {
      ok: false,
      error: "Unauthorized",
      details: String(error?.message || error),
    });
  }

  const limit = Math.min(Math.max(Number(event.queryStringParameters?.limit || 50), 1), 200);

  const query = new URLSearchParams({
    select:
      "id,level,passage_title,fluency_words_read,fluency_total_words,wpm,accuracy_percent,comprehension_score,comprehension_total,started_at,completed_at,created_at,student:student_profiles(full_name)",
    order: "created_at.desc",
    limit: String(limit),
  }).toString();

  try {
    const rows = await supabaseRequest(`/rest/v1/student_exam_attempts?${query}`);
    const items = Array.isArray(rows)
      ? rows.map((row) => ({
          id: row.id,
          studentName: row.student?.full_name || "Unknown Student",
          level: row.level || "-",
          passageTitle: row.passage_title || "-",
          fluencyWordsRead: Number(row.fluency_words_read || 0),
          fluencyTotalWords: Number(row.fluency_total_words || 0),
          wpm: Number(row.wpm || 0),
          accuracyPercent: Number(row.accuracy_percent || 0),
          comprehensionScore: Number(row.comprehension_score || 0),
          comprehensionTotal: Number(row.comprehension_total || 0),
          startedAt: row.started_at,
          completedAt: row.completed_at,
          createdAt: row.created_at,
        }))
      : [];

    return json(200, {
      ok: true,
      items,
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: "Failed to load teacher results",
      details: String(error?.message || error),
    });
  }
};

const {
  corsHeaders,
  json,
  parseBody,
  supabaseRequest,
} = require("./_teacher-auth-utils");

function toNonNegativeInt(value) {
  const num = Number(value);
  if (!Number.isFinite(num) || num < 0) return 0;
  return Math.round(num);
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

  const attemptId = toNonNegativeInt(payload.attemptId);
  if (!attemptId) {
    return json(400, { ok: false, error: "Valid attemptId is required" });
  }

  const fluencyWordsRead = toNonNegativeInt(payload.fluencyWordsRead);
  const fluencyTotalWords = toNonNegativeInt(payload.fluencyTotalWords);
  const wpm = toNonNegativeInt(payload.wpm);
  const accuracyPercent = toNonNegativeInt(payload.accuracyPercent);
  const comprehensionScore = toNonNegativeInt(payload.comprehensionScore);
  const comprehensionTotal = toNonNegativeInt(payload.comprehensionTotal);

  const updateBody = {
    fluency_words_read: fluencyWordsRead,
    fluency_total_words: fluencyTotalWords,
    wpm,
    accuracy_percent: accuracyPercent,
    comprehension_score: comprehensionScore,
    comprehension_total: comprehensionTotal,
    completed_at: new Date().toISOString(),
  };

  const query = new URLSearchParams({
    id: `eq.${attemptId}`,
    select: "id,student_id,level,passage_title,completed_at",
  }).toString();

  try {
    const rows = await supabaseRequest(`/rest/v1/student_exam_attempts?${query}`, {
      method: "PATCH",
      body: updateBody,
    });

    const updated = Array.isArray(rows) ? rows[0] : rows;
    if (!updated) {
      return json(404, { ok: false, error: "Attempt not found" });
    }

    return json(200, {
      ok: true,
      attempt: {
        id: updated.id,
        level: updated.level,
        passageTitle: updated.passage_title,
        completedAt: updated.completed_at,
      },
    });
  } catch (error) {
    return json(500, {
      ok: false,
      error: "Student attempt update failed",
      details: String(error?.message || error),
    });
  }
};

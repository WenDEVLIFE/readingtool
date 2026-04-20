const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(statusCode, body) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

function parseDeepgramTranscript(payload) {
  const alt = payload?.results?.channels?.[0]?.alternatives?.[0];
  if (!alt) {
    return { transcript: "", confidence: null };
  }

  return {
    transcript: String(alt.transcript || "").trim(),
    confidence: typeof alt.confidence === "number" ? alt.confidence : null,
  };
}

async function transcribeWithDeepgram(audioBuffer, mimeType, language, apiKey) {
  const candidateModels = [process.env.DEEPGRAM_MODEL || "nova-3", "nova-2"];
  const effectiveLanguage = String(language || "").trim().toLowerCase();
  let lastError = "";

  for (const model of candidateModels) {
    const endpoint = new URL("https://api.deepgram.com/v1/listen");
    endpoint.searchParams.set("model", model);
    endpoint.searchParams.set("smart_format", "true");
    endpoint.searchParams.set("punctuate", "true");

    if (effectiveLanguage === "multi" || effectiveLanguage === "auto") {
      endpoint.searchParams.set("detect_language", "true");
    } else if (effectiveLanguage) {
      endpoint.searchParams.set("language", effectiveLanguage);
    }

    const response = await fetch(endpoint.toString(), {
      method: "POST",
      headers: {
        Authorization: `Token ${apiKey}`,
        "Content-Type": mimeType || "audio/webm",
      },
      body: audioBuffer,
    });

    if (!response.ok) {
      const details = await response.text();
      lastError = `Deepgram(${model}) error ${response.status}: ${details}`;
      continue;
    }

    const payload = await response.json();
    const parsed = parseDeepgramTranscript(payload);
    return {
      provider: "deepgram",
      transcript: parsed.transcript,
      confidence: parsed.confidence,
      raw: payload,
    };
  }

  throw new Error(lastError || "Deepgram request failed");
}

async function transcribeWithOpenAi(audioBuffer, mimeType, apiKey) {
  const formData = new FormData();
  const blob = new Blob([audioBuffer], { type: mimeType || "audio/webm" });

  formData.append("file", blob, "speech.webm");
  formData.append("model", "whisper-1");
  formData.append("response_format", "json");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`OpenAI transcription error ${response.status}: ${details}`);
  }

  const payload = await response.json();
  return {
    provider: "openai",
    transcript: String(payload?.text || "").trim(),
    confidence: null,
    raw: payload,
  };
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

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  const audioBase64 = String(payload?.audioBase64 || "").trim();
  const mimeType = String(payload?.mimeType || "audio/webm").trim() || "audio/webm";
  const language = String(payload?.language || "multi").trim() || "multi";
  const requestedProvider = String(payload?.provider || process.env.STT_PROVIDER || "auto").toLowerCase();

  if (!audioBase64) {
    return json(400, { ok: false, error: "audioBase64 is required" });
  }

  let audioBuffer;
  try {
    audioBuffer = Buffer.from(audioBase64, "base64");
  } catch (error) {
    return json(400, { ok: false, error: "Invalid base64 audio data" });
  }

  if (!audioBuffer.length) {
    return json(400, { ok: false, error: "Audio data is empty" });
  }

  const deepgramKey = process.env.DEEPGRAM_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  const providers =
    requestedProvider === "auto"
      ? ["deepgram", "openai"]
      : [requestedProvider];

  const errors = [];

  for (const provider of providers) {
    try {
      if (provider === "deepgram") {
        if (!deepgramKey) {
          errors.push("Deepgram key not configured");
          continue;
        }

        const result = await transcribeWithDeepgram(audioBuffer, mimeType, language, deepgramKey);
        return json(200, {
          ok: true,
          provider: result.provider,
          transcript: result.transcript,
          confidence: result.confidence,
        });
      }

      if (provider === "openai") {
        if (!openAiKey) {
          errors.push("OpenAI key not configured");
          continue;
        }

        const result = await transcribeWithOpenAi(audioBuffer, mimeType, openAiKey);
        return json(200, {
          ok: true,
          provider: result.provider,
          transcript: result.transcript,
          confidence: result.confidence,
        });
      }

      errors.push(`Unsupported provider: ${provider}`);
    } catch (error) {
      errors.push(String(error?.message || error));
    }
  }

  return json(502, {
    ok: false,
    error: "No transcription provider succeeded",
    details: errors,
  });
};

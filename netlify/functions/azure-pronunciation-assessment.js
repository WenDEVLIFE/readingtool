const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: corsHeaders,
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Method not allowed" }),
    };
  }

  const speechKey = process.env.AZURE_SPEECH_KEY;
  const speechRegion = process.env.AZURE_SPEECH_REGION;

  if (!speechKey || !speechRegion) {
    return {
      statusCode: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Azure Speech credentials are not configured" }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Invalid JSON body" }),
    };
  }

  const referenceText = String(payload.referenceText || "").trim();
  const audioBase64 = String(payload.audioBase64 || "").trim();
  const language = String(payload.language || "en-US").trim() || "en-US";
  const mimeType = String(payload.mimeType || "audio/webm; codecs=opus").trim() || "audio/webm; codecs=opus";

  if (!referenceText) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "referenceText is required" }),
    };
  }

  if (!audioBase64) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "audioBase64 is required" }),
    };
  }

  let audioBuffer;
  try {
    audioBuffer = Buffer.from(audioBase64, "base64");
  } catch (error) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Invalid base64 audio data" }),
    };
  }

  if (!audioBuffer.length) {
    return {
      statusCode: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Audio data is empty" }),
    };
  }

  const pronunciationConfig = {
    ReferenceText: referenceText,
    GradingSystem: "HundredMark",
    Dimension: "Comprehensive",
    EnableMiscue: true,
  };

  const pronunciationHeader = Buffer.from(JSON.stringify(pronunciationConfig)).toString("base64");
  const endpoint = `https://${speechRegion}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=${encodeURIComponent(language)}&format=detailed`;

  try {
    const azureResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": speechKey,
        "Pronunciation-Assessment": pronunciationHeader,
        "Content-Type": mimeType,
        Accept: "application/json",
      },
      body: audioBuffer,
    });

    const responseText = await azureResponse.text();
    if (!azureResponse.ok) {
      return {
        statusCode: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({
          ok: false,
          error: "Azure request returned non-success status",
          status: azureResponse.status,
          details: responseText,
        }),
      };
    }

    let data;
    try {
      data = JSON.parse(responseText);
    } catch (error) {
      return {
        statusCode: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Invalid Azure response" }),
      };
    }

    const words = Array.isArray(data?.NBest?.[0]?.Words)
      ? data.NBest[0].Words.map((entry) => ({
          word: entry.Word || "",
          accuracyScore: entry?.PronunciationAssessment?.AccuracyScore ?? null,
          errorType: entry?.PronunciationAssessment?.ErrorType ?? null,
        }))
      : [];

    return {
      statusCode: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        ok: true,
        displayText: data.DisplayText || "",
        words,
      }),
    };
  } catch (error) {
    return {
      statusCode: 502,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: "Azure request failed", details: String(error.message || error) }),
    };
  }
};

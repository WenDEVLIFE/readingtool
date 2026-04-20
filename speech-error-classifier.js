(function (global) {
    function classify(context) {
        const ctx = context || {};
        const spoken = String(ctx.spoken || "");
        const target = String(ctx.target || "");
        const confidence = Number.isFinite(ctx.confidence) ? ctx.confidence : 1;
        const match = typeof ctx.isAcceptableWordMatch === "function"
            ? ctx.isAcceptableWordMatch(spoken, target)
            : spoken === target;

        if (match) {
            return "read";
        }

        const baseLength = Math.max(spoken.length, target.length, 1);
        const distance = typeof ctx.levenshteinDistance === "function"
            ? ctx.levenshteinDistance(spoken, target)
            : baseLength;
        const similarity = 1 - distance / baseLength;
        const misThreshold = Number.isFinite(ctx.mispronunciationSimilarityThreshold)
            ? ctx.mispronunciationSimilarityThreshold
            : 0.4;
        const lowConfidenceThreshold = Number.isFinite(ctx.lowConfidenceMispronunciationThreshold)
            ? ctx.lowConfidenceMispronunciationThreshold
            : 0.82;

        if (similarity >= misThreshold || confidence < lowConfidenceThreshold) {
            return "mis-error";
        }

        return "sub-error";
    }

    global.SpeechErrorClassifier = {
        classify
    };
})(window);

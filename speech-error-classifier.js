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
            : 0.34;
        const lowConfidenceThreshold = Number.isFinite(ctx.lowConfidenceMispronunciationThreshold)
            ? ctx.lowConfidenceMispronunciationThreshold
            : 0.82;
        const bridgeThreshold = Number.isFinite(ctx.mispronunciationBridgeSimilarityThreshold)
            ? ctx.mispronunciationBridgeSimilarityThreshold
            : 0.72;

        let bridgeSimilarity = 0;
        if (typeof ctx.normalizePhoneticBridge === "function") {
            const spokenBridge = String(ctx.normalizePhoneticBridge(spoken) || "");
            const targetBridge = String(ctx.normalizePhoneticBridge(target) || "");

            if (spokenBridge && targetBridge) {
                if (spokenBridge === targetBridge) {
                    bridgeSimilarity = 1;
                } else {
                    const bridgeBaseLength = Math.max(spokenBridge.length, targetBridge.length, 1);
                    const bridgeDistance = typeof ctx.levenshteinDistance === "function"
                        ? ctx.levenshteinDistance(spokenBridge, targetBridge)
                        : bridgeBaseLength;
                    bridgeSimilarity = 1 - bridgeDistance / bridgeBaseLength;
                }
            }
        }

        if (
            similarity >= misThreshold ||
            bridgeSimilarity >= bridgeThreshold ||
            confidence < lowConfidenceThreshold
        ) {
            return "mis-error";
        }

        return "sub-error";
    }

    global.SpeechErrorClassifier = {
        classify
    };
})(window);

(function (global) {
    function shouldApplySentenceFallback(context) {
        const ctx = context || {};
        const recognitionConfidence = Number.isFinite(ctx.recognitionConfidence) ? ctx.recognitionConfidence : 1;
        const minWords = Number.isFinite(ctx.minWords) ? ctx.minWords : 3;
        const minConfidence = Number.isFinite(ctx.minConfidence) ? ctx.minConfidence : 0.3;

        return (
            ctx.isFinalResult === true &&
            Number(ctx.currentWordIndex) === Number(ctx.startWordIndex) &&
            ctx.strictMobileLiveMode !== true &&
            Number(ctx.wordsToProcessLength || 0) >= minWords &&
            (!(ctx.isMobileRecognitionMode === true) || recognitionConfidence >= minConfidence)
        );
    }

    function resolvePostLoopAction(context) {
        const ctx = context || {};
        const currentWordIndex = Number(ctx.currentWordIndex || 0);
        const processCapIndex = Number(ctx.processCapIndex ?? Number.MAX_SAFE_INTEGER);
        const wordCount = Number(ctx.wordCount || 0);

        if (currentWordIndex > processCapIndex) {
            return { type: "stop" };
        }

        if (currentWordIndex < wordCount) {
            return { type: "none" };
        }

        return { type: "stop" };
    }

    global.VoiceInputEndEvaluator = {
        shouldApplySentenceFallback,
        resolvePostLoopAction
    };
})(window);

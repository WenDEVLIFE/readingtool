(function (global) {
    function processToken(context) {
        const ctx = context || {};

        const normalizedSpokenWord = ctx.normalizedSpokenWord;
        const targetWord = ctx.targetWord;
        const nextSpokenWord = ctx.nextSpokenWord;
        const nextTargetWord = ctx.nextTargetWord;

        if (ctx.isAcceptableWordMatch(normalizedSpokenWord, targetWord)) {
            if (!ctx.iosConservativeLive && ctx.isFinalResult && ctx.recognitionConfidence < ctx.lowConfidenceThreshold) {
                ctx.onMis();
            } else {
                ctx.onRead();
            }
            return true;
        }

        if (ctx.iosConservativeLive) {
            const boundedLookaheadMatch = ctx.findLookaheadMatch(
                normalizedSpokenWord,
                ctx.currentWordIndex + 1,
                ctx.safeLookahead,
                ctx.currentSentenceEnd
            );

            if (boundedLookaheadMatch !== -1) {
                ctx.onIosLookahead(boundedLookaheadMatch);
            }

            return true;
        }

        if (!ctx.allowErrors) {
            return true;
        }

        if (ctx.isFinalResult && nextSpokenWord && ctx.isAcceptableWordMatch(nextSpokenWord, targetWord)) {
            if (!ctx.iosConservativeLive) {
                ctx.onAdd();
            } else {
                ctx.onRefresh();
            }
            return true;
        }

        if (ctx.isAcceptableWordMatch(normalizedSpokenWord, nextTargetWord)) {
            if (!ctx.iosConservativeLive) {
                ctx.onOmit();
            } else {
                ctx.onAdvanceRefresh();
            }
            return true;
        }

        const hasNextAlignmentEvidence =
            ctx.isFinalResult ||
            (nextSpokenWord && ctx.isAcceptableWordMatch(nextSpokenWord, nextTargetWord));

        if (ctx.isClearMobileReadToken(normalizedSpokenWord, ctx.recognitionConfidence, ctx.isFinalResult) && hasNextAlignmentEvidence) {
            if (!ctx.iosConservativeLive) {
                ctx.onSub();
            } else {
                ctx.onAdvanceRefresh();
            }
        }

        return true;
    }

    global.LiveProgressRules = {
        processToken
    };
})(window);

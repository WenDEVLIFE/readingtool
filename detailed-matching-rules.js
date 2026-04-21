(function (global) {
    function processToken(context) {
        const ctx = context || {};

        if (ctx.isAcceptableWordMatch(ctx.normalizedSpokenWord, ctx.targetWord)) {
            if (ctx.isFinalResult && ctx.recognitionConfidence < ctx.lowConfidenceThreshold) {
                ctx.onExactMis();
            } else {
                ctx.onExactRead();
            }
            return true;
        }

        if (ctx.strictMobileLiveMode) {
            if (!ctx.allowErrors) {
                return true;
            }

            if (!ctx.isClearMobileReadToken(ctx.normalizedSpokenWord, ctx.recognitionConfidence, ctx.isFinalResult)) {
                return true;
            }

            if (ctx.isAcceptableWordMatch(ctx.normalizedSpokenWord, ctx.nextTargetWord)) {
                ctx.onStrictMobileOmit();
                return true;
            }

            ctx.onStrictMobileClassify();
            return true;
        }

        const lookaheadWindow = ctx.getLookaheadWindow();
        let lookaheadMatchIndex = ctx.findLookaheadMatch(
            ctx.normalizedSpokenWord,
            ctx.currentWordIndex + 1,
            lookaheadWindow,
            ctx.currentSentenceEnd
        );

        if (ctx.isMobileRecognitionMode && lookaheadMatchIndex > ctx.currentWordIndex + ctx.mobileMaxOmissionJump) {
            lookaheadMatchIndex = -1;
        }

        if (!ctx.isMobileRecognitionMode && lookaheadMatchIndex > ctx.currentWordIndex + 2) {
            lookaheadMatchIndex = -1;
        }

        if (lookaheadMatchIndex > ctx.currentWordIndex + 1) {
            ctx.onLookaheadRange(lookaheadMatchIndex);
            return true;
        }

        if (lookaheadMatchIndex === ctx.currentWordIndex + 1) {
            if (ctx.isMobileRecognitionMode) {
                ctx.onLookaheadSingleMobile();
            } else {
                const shouldPreferClassification =
                    ctx.isFinalResult !== true ||
                    ctx.recognitionConfidence < ctx.lowConfidenceThreshold;

                if (shouldPreferClassification) {
                    ctx.onDetermineError();
                } else {
                    ctx.onLookaheadSingleDesktop();
                }
            }
            return true;
        }

        if (!ctx.isMobileRecognitionMode && ctx.nextSentence) {
            const nextSentenceSpan = Math.min(
                2,
                ctx.nextSentence.end - ctx.nextSentence.start + 1
            );

            const nextSentenceMatch = ctx.findLookaheadMatch(
                ctx.normalizedSpokenWord,
                ctx.nextSentence.start,
                nextSentenceSpan,
                ctx.nextSentence.end
            );

            if (nextSentenceMatch !== -1) {
                ctx.onNextSentenceMatch(nextSentenceMatch);
                return true;
            }
        }

        if (!ctx.allowErrors) {
            return true;
        }

        if (ctx.isAcceptableWordMatch(ctx.normalizedSpokenWord, ctx.nextTargetWord)) {
            const shouldPreferClassification =
                !ctx.isMobileRecognitionMode &&
                (ctx.isFinalResult !== true ||
                    ctx.recognitionConfidence < ctx.lowConfidenceThreshold);

            if (shouldPreferClassification) {
                ctx.onDetermineError();
            } else {
                ctx.onOmission();
            }
            return true;
        }

        if (ctx.nextSpokenWord && ctx.isAcceptableWordMatch(ctx.nextSpokenWord, ctx.targetWord)) {
            ctx.onAddition();
            return true;
        }

        ctx.onDetermineError();
        return true;
    }

    global.DetailedMatchingRules = {
        processToken
    };
})(window);

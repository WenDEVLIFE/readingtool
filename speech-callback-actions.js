(function (global) {
    function create(context) {
        const ctx = context || {};

        function getCurrentWordIndex() {
            return Number(ctx.getCurrentWordIndex?.() ?? 0);
        }

        function setCurrentWordIndex(value) {
            ctx.setCurrentWordIndex?.(Math.max(0, Number(value) || 0));
        }

        return {
            advanceAndRefresh(options = {}) {
                setCurrentWordIndex(getCurrentWordIndex() + 1);
                ctx.stateMutations?.refresh(options);
            },
            strictMobileClassify(spokenWord, targetWord, recognitionConfidence, lowConfidenceThreshold) {
                const mobileConfidence = Math.max(Number(recognitionConfidence || 0), Number(lowConfidenceThreshold || 0));
                ctx.determineErrorType?.(spokenWord, targetWord, mobileConfidence);
                ctx.stateMutations?.refresh();
            },
            lookaheadSingleDesktop() {
                ctx.stateMutations?.errorAndAdvance("omit-error");
                ctx.stateMutations?.readAndAdvance();
            },
            omissionFlow(isMobileRecognitionMode, wordCount) {
                ctx.stateMutations?.errorAndAdvance("omit-error");

                if (isMobileRecognitionMode) {
                    return;
                }

                if (getCurrentWordIndex() < Number(wordCount || 0)) {
                    ctx.stateMutations?.readAndAdvance();
                }
            },
            determineAndRefresh(spokenWord, targetWord, recognitionConfidence) {
                ctx.determineErrorType?.(spokenWord, targetWord, recognitionConfidence);
                ctx.stateMutations?.refresh();
            },
            clampToEnd(index) {
                setCurrentWordIndex(Number(index || 0));
                ctx.highlightCurrentWord?.();
            }
        };
    }

    global.SpeechCallbackActions = {
        create
    };
})(window);

(function (global) {
    function create(context) {
        const ctx = context || {};

        function getIndex() {
            return Number(ctx.getCurrentWordIndex?.() ?? 0);
        }

        function setIndex(nextIndex) {
            ctx.setCurrentWordIndex?.(Math.max(0, Number(nextIndex) || 0));
        }

        function markOmissionsUntil(matchIndex) {
            const endIndex = Math.max(0, Number(matchIndex) || 0);
            while (getIndex() < endIndex) {
                ctx.markWordAsError?.(getIndex(), "omit-error");
                setIndex(getIndex() + 1);
            }
        }

        function applyLookaheadRange(matchIndex) {
            markOmissionsUntil(matchIndex);
            ctx.readAndAdvance?.();
        }

        function applyNextSentenceMatch(matchIndex) {
            markOmissionsUntil(matchIndex);
            ctx.syncSentencePointerToCurrentWord?.();
            ctx.readAndAdvance?.();
        }

        return {
            markOmissionsUntil,
            applyLookaheadRange,
            applyNextSentenceMatch
        };
    }

    global.SpeechTransitionHelpers = {
        create
    };
})(window);

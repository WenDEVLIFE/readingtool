(function (global) {
    function create(context) {
        const ctx = context || {};

        function getIndex() {
            return Number(ctx.getCurrentWordIndex?.() ?? 0);
        }

        function setIndex(nextValue) {
            ctx.setCurrentWordIndex?.(Math.max(0, Number(nextValue) || 0));
        }

        function refresh(options = {}) {
            ctx.highlightCurrentWord?.();
            ctx.resetHesitation?.();
            if (options.resetMobileStall) {
                ctx.resetMobileStallTracking?.();
            }
        }

        return {
            readAndAdvance(options = {}) {
                const index = getIndex();
                ctx.markWordAsRead?.(index);
                setIndex(index + 1);
                refresh(options);
            },
            errorAndAdvance(className, options = {}) {
                const index = getIndex();
                ctx.markWordAsError?.(index, className);
                setIndex(index + 1);
                refresh(options);
            },
            errorOnly(className, options = {}) {
                const index = getIndex();
                ctx.markWordAsError?.(index, className);
                refresh(options);
            },
            setIndexAndReadAdvance(index, options = {}) {
                setIndex(index);
                const nextIndex = getIndex();
                ctx.markWordAsRead?.(nextIndex);
                setIndex(nextIndex + 1);
                refresh(options);
            },
            refresh
        };
    }

    global.SpeechStateMutations = {
        create
    };
})(window);

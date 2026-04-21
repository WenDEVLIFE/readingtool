(function (global) {
    function toTailSnapshot(transcript, tailCount) {
        return String(transcript || "")
            .toLowerCase()
            .replace(/[^\w\s']/g, "")
            .split(/\s+/)
            .filter(Boolean)
            .slice(-Math.max(1, Number(tailCount) || 1))
            .join(" ");
    }

    function resolveFallbackAction(context) {
        const ctx = context || {};
        const tailSnapshot = toTailSnapshot(ctx.transcript, ctx.tailCount);
        if (!tailSnapshot) {
            return { shouldProcess: false };
        }

        const isDuplicate = tailSnapshot === String(ctx.lastSnapshot || "");
        const allowRepeat = isDuplicate && (Number(ctx.now || 0) - Number(ctx.lastSnapshotAt || 0) > 120);
        if (isDuplicate && !allowRepeat) {
            return { shouldProcess: false };
        }

        const isFinal = ctx.isFinal === true;
        return {
            shouldProcess: true,
            snapshot: tailSnapshot,
            options: {
                allowErrors: true,
                confidence: Number.isFinite(ctx.confidence) ? ctx.confidence : NaN,
                isFinal,
                liveProgressOnly: true
            }
        };
    }

    function getTailCount(livePolicy) {
        const policy = livePolicy || {};
        return Number(policy.androidFinalTailSize || 3);
    }

    function getFinalDeltaOptions(context) {
        const ctx = context || {};
        return {
            allowErrors: true,
            confidence: Number.isFinite(ctx.confidence) ? ctx.confidence : NaN,
            isFinal: ctx.isFinal === true,
            liveProgressOnly: true
        };
    }

    global.AndroidReadAloudFlow = {
        resolveFallbackAction,
        getTailCount,
        getFinalDeltaOptions
    };
})(window);

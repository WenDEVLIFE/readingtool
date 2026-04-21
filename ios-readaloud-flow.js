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

        return {
            shouldProcess: true,
            snapshot: tailSnapshot,
            options: {
                allowErrors: false,
                confidence: Number.isFinite(ctx.confidence) ? ctx.confidence : NaN,
                isFinal: ctx.isFinal === true,
                liveProgressOnly: true
            }
        };
    }

    function getTailCount(livePolicy) {
        const policy = livePolicy || {};
        return Number(policy.iosFinalTailSize || 4);
    }

    function getFinalDeltaOptions(context) {
        const ctx = context || {};
        return {
            allowErrors: false,
            confidence: Number.isFinite(ctx.confidence) ? ctx.confidence : NaN,
            isFinal: ctx.isFinal === true,
            liveProgressOnly: true
        };
    }

    global.IOSReadAloudFlow = {
        resolveFallbackAction,
        getTailCount,
        getFinalDeltaOptions
    };
})(window);

(function (global) {
    function create(runtime, livePolicy, options) {
        const safeRuntime = runtime || {};
        const safePolicy = livePolicy || {};
        const safeOptions = options || {};

        const forceDetailedMatching = safeOptions.forceDetailedMatching === true;
        const liveProgressOnly = safeOptions.liveProgressOnly === true;

        const isMobileRecognitionMode = safeRuntime.mobile === true;
        const strictMobileLiveMode = isMobileRecognitionMode && !forceDetailedMatching;
        const iosConservativeLive = safeRuntime.ios === true && liveProgressOnly && !forceDetailedMatching;

        function getFinalTailSize(isFinalResult) {
            if (!strictMobileLiveMode || !isFinalResult) {
                return 0;
            }

            if (safeRuntime.ios) {
                return Number.isFinite(safePolicy.iosFinalTailSize) ? safePolicy.iosFinalTailSize : 10;
            }

            if (safeRuntime.android) {
                return Number.isFinite(safePolicy.androidFinalTailSize) ? safePolicy.androidFinalTailSize : 3;
            }

            return 1;
        }

        function getSafeLookahead() {
            return Number.isFinite(safePolicy.iosSafeLookahead) ? safePolicy.iosSafeLookahead : 3;
        }

        return {
            isMobileRecognitionMode,
            strictMobileLiveMode,
            iosConservativeLive,
            getFinalTailSize,
            getSafeLookahead
        };
    }

    global.PlatformSpeechAdapter = {
        create
    };
})(window);

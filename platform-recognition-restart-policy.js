(function (global) {
    function create(runtime) {
        const safeRuntime = runtime || {};

        if (safeRuntime.ios) {
            return {
                initialStartDelayMs: 140,
                startRetryDelayMs: 420,
                restartDebounceMs: 160,
                restartRetryDelayMs: 320
            };
        }

        if (safeRuntime.android) {
            return {
                initialStartDelayMs: 120,
                startRetryDelayMs: 280,
                restartDebounceMs: 120,
                restartRetryDelayMs: 220
            };
        }

        return {
            initialStartDelayMs: 90,
            startRetryDelayMs: 220,
            restartDebounceMs: 90,
            restartRetryDelayMs: 180
        };
    }

    global.PlatformRecognitionRestartPolicy = {
        create
    };
})(window);

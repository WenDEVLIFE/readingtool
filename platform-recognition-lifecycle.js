(function (global) {
    function create(runtime, watchdogProfile) {
        const safeRuntime = runtime || {};
        const safeWatchdog = watchdogProfile || {};

        const recoverableErrors = new Set(["no-speech", "aborted", "network"]);

        function isRecoverableError(errorCode) {
            return recoverableErrors.has(String(errorCode || "").toLowerCase());
        }

        function shouldRestartOnEnd(context) {
            const safeContext = context || {};
            return safeContext.isRecording === true && safeContext.shouldAutoRestartRecognition === true;
        }

        function shouldRestartOnError(context) {
            const safeContext = context || {};
            if (!(safeContext.isRecording === true && safeContext.shouldAutoRestartRecognition === true)) {
                return false;
            }

            if (safeContext.allowAnyError === true) {
                return true;
            }

            return isRecoverableError(safeContext.error);
        }

        function getWatchdogRestartReason(state) {
            const safeState = state || {};
            const now = Number(safeState.now || Date.now());
            const lastRestartAt = Number(safeState.lastRecognitionRestartAt || 0);
            const lastEventAt = Number(safeState.lastRecognitionEventAt || 0);
            const sessionStartedAt = Number(safeState.recognitionSessionStartedAt || 0);

            const restartCooldownMs = Number(safeWatchdog.restartCooldownMs || 1800);
            const initialSilenceThresholdMs = Number(safeWatchdog.initialSilenceThresholdMs || 3200);
            const staleStreamThresholdMs = Number(safeWatchdog.staleStreamThresholdMs || 2600);

            const restartCooldownElapsed = now - lastRestartAt > restartCooldownMs;
            if (!restartCooldownElapsed) {
                return null;
            }

            if (!lastEventAt) {
                const initialSilenceTooLong = sessionStartedAt > 0 && now - sessionStartedAt > initialSilenceThresholdMs;
                if (initialSilenceTooLong) {
                    return "initial-silence";
                }

                return null;
            }

            const staleRecognitionStream = now - lastEventAt > staleStreamThresholdMs;
            if (staleRecognitionStream) {
                return "stale-stream";
            }

            return null;
        }

        return {
            runtime: safeRuntime,
            watchdogProfile: safeWatchdog,
            isRecoverableError,
            shouldRestartOnEnd,
            shouldRestartOnError,
            getWatchdogRestartReason
        };
    }

    global.PlatformRecognitionLifecycle = {
        create
    };
})(window);

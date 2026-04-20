(function (global) {
    function getUserAgent() {
        return String(global.navigator?.userAgent || "");
    }

    function detectRuntime() {
        const ua = getUserAgent();
        const ios = /iPad|iPhone|iPod/i.test(ua) && !global.MSStream;
        const android = /Android/i.test(ua);
        const mobileMedia = !!global.matchMedia?.("(max-width: 768px)")?.matches;
        const mobileUa = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);
        const mobile = mobileMedia || mobileUa;

        return {
            ios,
            android,
            mobile,
            desktop: !mobile
        };
    }

    function getWatchdogProfile(runtime) {
        if (runtime.ios) {
            return {
                restartCooldownMs: 8000,
                initialSilenceThresholdMs: 25000,
                staleStreamThresholdMs: 12000,
                fallbackNoticeRetryCount: 6
            };
        }

        if (runtime.mobile) {
            return {
                restartCooldownMs: 6500,
                initialSilenceThresholdMs: 15000,
                staleStreamThresholdMs: 10000,
                fallbackNoticeRetryCount: 5
            };
        }

        return {
            restartCooldownMs: 1800,
            initialSilenceThresholdMs: 3200,
            staleStreamThresholdMs: 2600,
            fallbackNoticeRetryCount: 3
        };
    }

    function getLivePolicy(runtime) {
        return {
            strictMobileLiveMode: runtime.mobile,
            iosConservativeLive: runtime.ios,
            iosSafeLookahead: runtime.ios ? 3 : 1,
            iosFinalTailSize: runtime.ios ? 10 : 1,
            androidFinalTailSize: runtime.android ? 3 : 1
        };
    }

    function getMatchingProfile(runtime) {
        if (runtime.ios) {
            return {
                lowConfidenceMispronunciationThreshold: 0.86,
                interimProcessMinConfidence: 0.55,
                finalProcessMinConfidence: 0.4,
                mobileFastReadingLookahead: 1,
                mobileMaxOmissionJump: 1,
                sentenceFallbackMinWords: 4,
                sentenceFallbackMinMatchRatio: 0.45,
                sentenceFallbackMinConfidence: 0.55
            };
        }

        if (runtime.android) {
            return {
                lowConfidenceMispronunciationThreshold: 0.84,
                interimProcessMinConfidence: 0.5,
                finalProcessMinConfidence: 0.34,
                mobileFastReadingLookahead: 1,
                mobileMaxOmissionJump: 1,
                sentenceFallbackMinWords: 4,
                sentenceFallbackMinMatchRatio: 0.4,
                sentenceFallbackMinConfidence: 0.45
            };
        }

        return {
            lowConfidenceMispronunciationThreshold: 0.82,
            interimProcessMinConfidence: 0.45,
            finalProcessMinConfidence: 0.3,
            mobileFastReadingLookahead: 1,
            mobileMaxOmissionJump: 1,
            sentenceFallbackMinWords: 3,
            sentenceFallbackMinMatchRatio: 0.35,
            sentenceFallbackMinConfidence: 0.3
        };
    }

    global.PlatformSpeechStrategy = {
        detectRuntime,
        getWatchdogProfile,
        getLivePolicy,
        getMatchingProfile
    };
})(window);

(function (global) {
    const STORAGE_KEY = "readingtoolDebugDecisions";
    const LOG_LIMIT = 400;

    function isEnabledByStorage() {
        try {
            return localStorage.getItem(STORAGE_KEY) === "1";
        } catch {
            return false;
        }
    }

    function create() {
        let enabled = isEnabledByStorage();
        const logs = [];

        function setEnabled(nextEnabled) {
            enabled = !!nextEnabled;
            try {
                localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
            } catch {}
        }

        function clear() {
            logs.length = 0;
        }

        function sanitize(payload) {
            if (payload == null) return payload;
            if (typeof payload === "string" || typeof payload === "number" || typeof payload === "boolean") {
                return payload;
            }

            try {
                return JSON.parse(JSON.stringify(payload));
            } catch {
                return String(payload);
            }
        }

        function log(event, payload) {
            if (!enabled) return;

            logs.push({
                at: Date.now(),
                event: String(event || "unknown"),
                payload: sanitize(payload)
            });

            if (logs.length > LOG_LIMIT) {
                logs.splice(0, logs.length - LOG_LIMIT);
            }

            try {
                console.debug("[decision]", event, payload || "");
            } catch {}
        }

        function getRecent(limit = 80) {
            const capped = Math.max(1, Math.min(Number(limit) || 80, LOG_LIMIT));
            return logs.slice(-capped);
        }

        return {
            isEnabled: () => enabled,
            setEnabled,
            clear,
            log,
            getRecent
        };
    }

    const instance = create();
    global.DecisionDebugLogger = instance;
})(window);

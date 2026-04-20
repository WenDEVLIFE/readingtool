(function (global) {
    function toNormalizedWords(spokenText) {
        return String(spokenText || "")
            .toLowerCase()
            .replace(/[^\w\s']/g, "")
            .split(/\s+/)
            .filter(Boolean);
    }

    function getWordsToProcess(spokenWords, context) {
        const safeWords = Array.isArray(spokenWords) ? spokenWords : [];
        const safeContext = context || {};
        const strictMobileLiveMode = safeContext.strictMobileLiveMode === true;
        const isFinalResult = safeContext.isFinalResult === true;

        if (!(strictMobileLiveMode && isFinalResult)) {
            return safeWords;
        }

        const tailSize = Number(safeContext.tailSize || 1);
        return safeWords.slice(-Math.max(1, tailSize));
    }

    function getLookaheadWindow(context) {
        const safeContext = context || {};
        const isMobileRecognitionMode = safeContext.isMobileRecognitionMode === true;
        const mobileLookahead = Number(safeContext.mobileLookahead || 1);
        const fastReadingLookahead = Number(safeContext.fastReadingLookahead || 4);
        const currentSentenceEnd = Number(safeContext.currentSentenceEnd || 0);
        const currentWordIndex = Number(safeContext.currentWordIndex || 0);

        if (isMobileRecognitionMode) {
            return mobileLookahead;
        }

        return Math.max(fastReadingLookahead, currentSentenceEnd - currentWordIndex);
    }

    global.TranscriptMatchingEngine = {
        toNormalizedWords,
        getWordsToProcess,
        getLookaheadWindow
    };
})(window);

function isQuotaExceededError(error) {
    return (
        error instanceof DOMException &&
    // Everything except Firefox
    (error.code === 22 ||
      // Firefox
      error.code === 1014 ||
      // Test name field too, because code might not be present
      // Everything except Firefox
      error.name === "QuotaExceededError" ||
      // Firefox
      error.name === "NS_ERROR_DOM_QUOTA_REACHED")
    );
}

export default class Cache {
    static clear() {
        localStorage.clear();
        console.warn("[Cache.clear] localStorage cleared!");
    }

    static async get(cacheKey, asyncFallback) {
        const hotItem = localStorage.getItem(cacheKey);
        if (hotItem) {
            return JSON.parse(hotItem);
        }

        const coldItem = await asyncFallback();
        try {
            const coldItemJSON = JSON.stringify(coldItem);
            localStorage.setItem(cacheKey, coldItemJSON);

            // logging
            const size = coldItemJSON.length;
            const sizeK = Math.round(size / 1000);
            const logger = sizeK > 500 ? console.warn : console.log;
            logger(`📦 "${cacheKey}" (${sizeK}KB)`);
        } catch (e) {
            console.error(e);
            if (isQuotaExceededError(e)) {
                Cache.clear();
            }
        }
        return coldItem;
    }
}

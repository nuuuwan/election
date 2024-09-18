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

      // logging
      const size = coldItemJSON.length;
      const sizeK = Math.round(size / 1000);
      const logger = sizeK > 500 ? console.warn : console.log;
      logger(`📦 "${cacheKey}" (${sizeK}KB)`);
    } catch (QuotaExceededError) {
      Cache.clear();
    }
    return coldItem;
  }
}

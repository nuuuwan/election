export default class Cache {
  static async get(cacheKey, asyncFallback) {
    const hotItem = localStorage.getItem(cacheKey);
    if (hotItem) {
      return JSON.parse(hotItem);
    }

    console.debug("❄️⌛", "Cache.get", "cold", cacheKey);
    const coldItem = await asyncFallback();
    try {
      const coldItemJSON = JSON.stringify(coldItem);
      localStorage.setItem(cacheKey, coldItemJSON);
    } catch (QuotaExceededError) {
      localStorage.clear();
      console.warn("⚠️ localStorage cleared!");
    }
    return coldItem;
  }

  static getSync(cacheKey, fallback) {
    const hotItem = localStorage.getItem(cacheKey);
    if (hotItem) {
      return JSON.parse(hotItem);
    }

    console.debug("⌛", "Cache.getSync", "cold", cacheKey);
    const coldItem = fallback();
    try {
      localStorage.setItem(cacheKey, JSON.stringify(coldItem));
    } catch (QuotaExceededError) {
      localStorage.clear();
    }
    return coldItem;
  }
}

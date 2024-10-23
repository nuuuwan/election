export default class Statistics {
  static percentile(arr, percentile) {
    if (arr.length === 0) {
      return NaN;
    }
    const sorted = arr.sort((a, b) => a - b);
    const idx = percentile * (sorted.length - 1);
    const lo = Math.floor(idx);
    const hi = Math.ceil(idx);
    if (lo === hi) {
      return sorted[lo];
    }
    return sorted[lo] * (hi - idx) + sorted[hi] * (idx - lo);
  }

  static median(arr) {
    return Statistics.percentile(arr, 0.5);
  }
}

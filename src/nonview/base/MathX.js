export default class MathX {
  static EPSILON = 0.0000000001;

  static sum(numList) {
    return numList.reduce(function (_sum, num) {
      return _sum + num;
    }, 0);
  }

  static sumValues(d) {
    return MathX.sum(Object.values(d));
  }

  static mean(numList) {
    return MathX.sum(numList) / numList.length;
  }

  static forceRange(value, min, max) {
    return Math.max(min, Math.min(max, value));
  }

  static range(min, max) {
    const span = max - min;
    return [...Array(span).keys()].map((x) => x + min);
  }
}

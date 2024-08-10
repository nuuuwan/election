export default class Fraction {
  constructor(n, d, context = {}) {
    this.n = n;
    this.d = d;

    this.context = context;
  }

  get p() {
    return this.n / this.d;
  }

  localeCompare(other) {
    if (this.p > other.p) {
      return 1;
    }
    if (this.p < other.p) {
      return -1;
    }
    return 0;
  }

  add(other) {
    return new Fraction(this.n + other.n, this.d + other.d);
  }

  zero() {
    return new Fraction(0, 0);
  }
}

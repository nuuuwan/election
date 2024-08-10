export default class Integer {
  constructor(n, context = {}) {
    this.n = n;

    this.context = context;
  }

  localeCompare(other) {
    if (this.n > other.n) {
      return 1;
    }
    if (this.n < other.n) {
      return -1;
    }
    return 0;
  }
}

import Fraction from "./Fraction";

export default class Scalar {
  static get(x) {
    if (!x) {
      return null;
    }
    if (typeof x === "string") {
      return x;
    }
    if (typeof x === "number") {
      return x.toFixed(3);
    }
    if (x instanceof Fraction) {
      return x.p;
    }
    if (typeof x === "object") {
      return x.id;
    }
    throw new Error("SparseMatrix: invalid scalar: " + x);
  }
}

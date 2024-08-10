export default class Comparator {
  static assertSameType(a, b) {
    if (typeof a !== typeof b) {
      throw new Error("a & b must be of the same type: " + [a, b]);
    }
  }

  static cmpNull(a, b) {
    if (!a && !b) {
      return 0;
    }
    if (!a) {
      return -1;
    }
    if (!b) {
      return 1;
    }
  }

  static cmpInner(a, b) {
    if (!a || !b) {
      return Comparator.cmpNull(a, b);
    }

    Comparator.assertSameType(a, b);

    if (typeof a === "number") {
      return a - b;
    }

    if (typeof a === "object") {
      return a.localeCompare(b);
    }

    throw new Error("Invalid values: " + [a, b]);
  }

  static cmp(a, b, sortReverse = true) {
    return sortReverse ? Comparator.cmpInner(a, b) : Comparator.cmpInner(b, a);
  }

  static zero(value) {
    if (typeof value === "number") {
      return 0;
    }
    if (typeof value === "object") {
      return value.zero();
    }

    throw new Error("Invalid value: " + value);
  }

  static sumPair(a, b) {
    Comparator.assertSameType(a, b);

    if (typeof a === "number") {
      return a + b;
    }

    if (typeof a === "object") {
      return a.add(b);
    }

    throw new Error("Invalid values: " + [a, b]);
  }

  static sum(valueList) {
    const nonTrivialValueLIst = valueList.filter((x) => !!x);
    if (!nonTrivialValueLIst) {
      return null;
    }
    const firstValue = nonTrivialValueLIst[0];

    return nonTrivialValueLIst.reduce(
      (acc, val) => Comparator.sumPair(acc, val),
      Comparator.zero(firstValue)
    );
  }
}

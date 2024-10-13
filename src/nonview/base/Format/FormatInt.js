
const FormatInt = {
  int(x) {
    return x.toLocaleString();
  },

  intHumanizeSigned(x) {
    const sign = x < 0 ? "-" : "+";
    return sign + FormatInt.intHumanize(Math.abs(x));
  },

  intHumanize(value) {
    if (value === null || value === undefined) {
      return "";
    }

    if (value === 0) {
      return 0;
    }

    let value_limit, mult, suffix;
    for ([value_limit, mult, suffix] of [
      [10_000_000, 10, "M"],
      [1_000_000, 1, "M"],
      [100_000, 10, "K"],
      [10_000, 1,"K"],
      [1_000, 1, "K"],
      [100, 10, ""],
    ]) {
      if (value > value_limit) {
        return mult * (value / value_limit).toFixed(1) + suffix;
      }
    }

    return value.toString();
  },


};
export default FormatInt;

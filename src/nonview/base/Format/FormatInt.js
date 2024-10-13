import FormatGeneric from "./FormatGeneric";
const FormatInt = {
  int(x) {
    return x.toLocaleString();
  },

  intHumanizeSigned(x) {
    const sign = x < 0 ? "-" : "+";
    return sign + FormatInt.intHumanize(Math.abs(x));
  },

  intHumanizeOld(value) {
    if (value === null || value === undefined) {
      return "";
    }

    if (value === 0) {
      return 0;
    }

    const tier = Math.floor(Math.log10(Math.abs(value)) / 3);
    if (tier === 0) {
      return value.toString();
    }

    const suffixes = ["", "K", "M", "B", "T"];
    const suffix = suffixes[tier];
    const scale = Math.pow(10, tier * 3);
    const scaledValue = value / scale;

    return scaledValue.toPrecision(3) + suffix;
  },

  intHumanize(value) {
    if (value === null || value === undefined) {
      return "";
    }

    if (value === 0) {
      return 0;
    }

    let value_limit, fixed, suffix;
    for ([value_limit, fixed, suffix] of [
      [10_000_000, 0, "M"],
      [1_000_000, 1, "M"],
      [100_000, 0, "K"],
      [10_000, 0, "K"],
      [1_000, 1, "K"],
      [100, 0, ""],
    ]) {
      if (value > value_limit) {
        return (value / value_limit).toFixed(fixed) + suffix;
      }
    }

    return value.toString();
  },


};
export default FormatInt;

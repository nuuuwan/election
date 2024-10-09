import FormatGeneric from "./FormatGeneric";
let FormatInt = {
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
    if (value > 10_000_000) {
      return (value / 1_000_000).toFixed(0) + "M";
    }
    if (value > 1_000_000) {
      return (value / 1_000_000).toFixed(1) + "M";
    }
    if (value > 100_000) {
      return 10 * (value / 10_000).toFixed(0) + "K";
    }
    if (value > 10_000) {
      return (value / 1_000).toFixed(0) + "K";
    }
    if (value > 1_000) {
      return (value / 1_000).toFixed(1) + "K";
    }
    if (value > 100) {
      return 10 * (value / 100).toFixed(0);
    }
    return value.toString();
  },

  intHumanizeWithStyle(
    x,
    valueRange = [10, 100],
    fontSizeRange = FormatGeneric.DEFAULT_FONT_SIZE_RANGE
  ) {
    return FormatGeneric.formatWithStyle(
      x,
      FormatInt.intHumanize,
      valueRange,
      fontSizeRange
    );
  },
};
export default FormatInt;

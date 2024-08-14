import FormatGeneric from "./FormatGeneric";
let FormatInt = {
  int(x) {
    return x.toLocaleString();
  },

  intHumanizeSigned(x) {
    const sign = x < 0 ? "-" : "+";
    return sign + FormatInt.intHumanize(Math.abs(x));
  },

  intHumanize(x) {
    if (!x || x === 0) {
      return "-";
    }
    // M
    if (x > 10_000_000) {
      return `${(x / 1_000_000).toFixed(1)}M`;
    }
    if (x > 1_000_000) {
      return `${(x / 1_000_000).toFixed(2)}M`;
    }
    // K
    if (x > 100_000) {
      return `${(x / 1_000).toFixed(0)}K`;
    }
    if (x > 10_000) {
      return `${(x / 1_000).toFixed(1)}K`;
    }
    if (x > 1_000) {
      return `${(x / 1_000).toFixed(2)}K`;
    }
    // Unit
    return x.toLocaleString();
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

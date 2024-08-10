import FormatGeneric from "./FormatGeneric";
let FormatInt = {
  int(x) {
    return x.toLocaleString();
  },

  intHumanize(x) {
    if (!x || x === 0) {
      return "-";
    }
    if (x > 1_000_000) {
      return `${(x / 1_000_000).toFixed(1)}M`;
    }
    if (x > 1_000) {
      return `${(x / 1_000).toFixed(0)}K`;
    }
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

import FormatGeneric from "./FormatGeneric";
let FormatInt = {
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

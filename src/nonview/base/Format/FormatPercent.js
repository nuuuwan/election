import FormatGeneric from "./FormatGeneric";

let FormatPercent = {
  percentAbs(x) {
    if (x < 0.000001) {
      return "-";
    }
    let minimumFractionDigits = 1;
    if (x > 0.1) {
      minimumFractionDigits = 0;
    }

    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits,
    });
  },

  percent(x) {
    const absX = Math.abs(x);
    const sign = x < 0 ? "-" : "";
    return sign + FormatPercent.percentAbs(absX);
  },

  percentWithStyle(
    x,
    valueRange = [0.01, 0.67],
    fontSizeRange = FormatGeneric.DEFAULT_FONT_SIZE_RANGE
  ) {
    return FormatGeneric.formatWithStyle(
      x,
      FormatPercent.percent,
      valueRange,
      fontSizeRange
    );
  },
};
export default FormatPercent;

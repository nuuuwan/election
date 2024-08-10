import FormatGeneric from "./FormatGeneric";
import FormatPercent from "./FormatPercent";

let FormatPercentagePoint = {
  percentagePoint(x) {
    const absX = Math.abs(x);
    if (absX < 0.001) {
      return "-";
    }
    const sign = x < 0 ? "-" : "+";
    return sign + FormatPercent.percentAbs(absX).replace("%", "pp");
  },

  percentagePointWithStyle(x, colorOverride = null) {
    return FormatGeneric.formatWithStyle(
      x,
      FormatPercentagePoint.percentagePoint,
      [0.01, 0.1],
      FormatGeneric.DEFAULT_FONT_SIZE_RANGE,
      colorOverride
    );
  },
};

export default FormatPercentagePoint;

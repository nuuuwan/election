import FormatGeneric from "./FormatGeneric";

let FormatPercent = {
  percentAbs(x, minimumFractionDigits = undefined) {
    if (x < 0.000001) {
      return "-";
    }

    if (minimumFractionDigits === undefined) {
      minimumFractionDigits = 0;
    }

    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits,
    });
  },

  percentVotes(x) {
    // Never display "50%"
    if (0.4995 < x && x <= 0.5) {
      return "49.9%";
    }
    if (0.5 < x && x < 0.5005) {
      return "50.1%";
    }

    return FormatPercent.percentAbs(x, 0);
  },

  percent(x, minimumFractionDigits = undefined) {
    const absX = Math.abs(x);
    const sign = x < 0 ? "-" : "";
    return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
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

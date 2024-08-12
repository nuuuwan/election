import FormatGeneric from "./FormatGeneric";

let FormatPercent = {
  percentAbs(x, minimumFractionDigits = undefined) {
    if (x < 0.000001) {
      return "-";
    }

    if (!minimumFractionDigits) {
      let minimumFractionDigits = 1;
      if (x > 0.105) {
        minimumFractionDigits = 0;
      }
    }

    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits,
    });
  },

  percentVotes(x) {
    const diffX = Math.abs(x - 0.5);
    const minimumFractionDigits = Math.max(0, parseInt(-Math.log10(diffX) - 1));
    return FormatPercent.percentAbs(x, minimumFractionDigits);
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

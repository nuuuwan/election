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
    let minimumFractionDigits = 0;
    const diffX = Math.abs(x - 0.5);
    if (diffX < 0.01) {
      minimumFractionDigits = Math.ceil(-Math.log10(diffX) - 2);
    }
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

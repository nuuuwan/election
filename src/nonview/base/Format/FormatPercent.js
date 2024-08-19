import FormatGeneric from "./FormatGeneric";

let FormatPercent = {
  percentAbs(x, minimumFractionDigits = undefined) {
    if (x < 0.000001) {
      return "-";
    }

    if (minimumFractionDigits === undefined) {
      if (x > 0.1) {
        minimumFractionDigits = 0;
      } else {
        minimumFractionDigits = 1;
      }  
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
    if (x < 0.005 && x > 0) {
      return "<0.5%";
    }
    const absX = Math.abs(x);
    const sign = x < 0 ? "-" : "";
    return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
  },

  percentError(x) {
    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 2,
    });
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

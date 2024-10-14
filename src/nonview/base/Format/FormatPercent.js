

const FormatPercent = {
  percentAbs(x, minimumFractionDigits = undefined) {
    if (!x) {
      return "";
    }
    if (x < 0.000001) {
      return "0.0%";
    }

    if (minimumFractionDigits === undefined) {
      minimumFractionDigits = 0;
    }

    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits,
    });
  },



  percent(x, minimumFractionDigits = undefined) {
    if (0 < x &&x  < 0.005) {
      return "<0.5%";
    }
    if (0.995 < x && x  < 1) {
      return ">99.5%";
    }
  
    const absX = Math.abs(x);
    const sign = x < 0 ? "-" : "";
    return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
  },

  percentSigned(x, minimumFractionDigits = undefined) {
    if (x < 0.005 && x > 0) {
      return "<0.5%";
    }
    const absX = Math.abs(x);
    const sign = x < 0 ? "-" : "+";
    return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
  },

  percentFixed(x) {
    return x.toLocaleString(undefined, {
      style: "percent",
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  },



  percentRange(p1, p2) {
    const s1 = FormatPercent.percent(p1);
    const s2 = FormatPercent.percent(p2);
    if (s1 === s2 || !s2) {
      return s1;
    }
    return s1.substring(0, s1.length - 1) + " - " + s2;
  },
};
export default FormatPercent;

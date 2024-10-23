const FormatPercent = {
  percentAbs(x, minimumFractionDigits = undefined) {
    if (!x) {
      return '';
    }
    if (x < 0.000001) {
      return '0.0%';
    }

    if (minimumFractionDigits === undefined) {
      minimumFractionDigits = 0;
    }

    return x.toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits,
    });
  },

  percent(x, minimumFractionDigits = undefined) {
    if (0 < x && x < 0.005) {
      return '<0.5%';
    }
    if (0.995 < x && x < 1) {
      return '>99.5%';
    }

    const absX = Math.abs(x);
    const sign = x < 0 ? '-' : '';
    return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
  },

  percentVotes(x) {
    const diff = Math.abs(parseFloat(x) - 0.5);
    if (diff < 0.000000001) {
      return '50%';
    }
    const minimumFractionDigits = Math.max(
      0,
      -Math.floor(Math.log10(diff)) - 2,
    );
    return FormatPercent.percent(x, minimumFractionDigits);
  },

  percentSigned(x, minimumFractionDigits = undefined) {
    if (x < 0.005 && x > 0) {
      return '<0.5%';
    }
    const absX = Math.abs(x);
    const sign = x < 0 ? '-' : '+';
    return sign + FormatPercent.percentAbs(absX, minimumFractionDigits);
  },

  percentFixed(x) {
    return x.toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    });
  },

  percentRange(p1, p2) {
    const s1 = FormatPercent.percentVotes(p1);
    const s2 = FormatPercent.percentVotes(p2);
    if (s1 === s2 || !s2) {
      return s1;
    }
    return s1.substring(0, s1.length - 1) + ' - ' + s2;
  },
};

export default FormatPercent;

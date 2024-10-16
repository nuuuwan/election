
const FormatInt = {
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

    const log10 = Math.floor(Math.log10(Math.abs(value)));
    const log10K = Math.floor(log10 / 3);
    const scaledValue = value / Math.pow(10, log10K * 3);
    const extraDigits = log10 % 3;
    const nDecimalPlaces = 1 - extraDigits;
    const nDecimalPlacesActual = Math.max(0, nDecimalPlaces);
    const mult = Math.pow(10, nDecimalPlacesActual - nDecimalPlaces);
    const valueStr = (scaledValue / mult).toFixed(nDecimalPlacesActual) * mult;
    
    const symbol = {
      2: "M",
      1: "K",
      0: "",
    }[log10K];
    
    return valueStr + symbol;
  },


};
export default FormatInt;

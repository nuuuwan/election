import MathX from "../MathX.js";
import { THEME_DATA } from "../../../view/_constants/THEME";

const FormatGeneric = {
  getFontSize(x, valueRange, fontSizeRange) {
    x = Math.abs(x);
    const [minValue, maxValue] = valueRange;
    const [minFontSize, maxFontSize] = fontSizeRange;

    const pLogX = MathX.fitRange(
      (Math.log10(x) - Math.log10(minValue)) /
        (Math.log10(maxValue) - Math.log10(minValue)),
      0,
      1
    );
    const fontSize = minFontSize + pLogX * (maxFontSize - minFontSize);
    if (!fontSize || isNaN(fontSize)) {
      return minFontSize;
    }
    return fontSize;
  },

  getColor(x, valueRange) {
    const minValue = valueRange[0];
    return x < minValue ? "secondary" : "inherit";
  },


};

FormatGeneric.DEFAULT_FONT_SIZE = THEME_DATA.typography.fontSize;
FormatGeneric.DEFAULT_FONT_SIZE_RANGE = [
  FormatGeneric.DEFAULT_FONT_SIZE,
  FormatGeneric.DEFAULT_FONT_SIZE * 2,
];
export default FormatGeneric;

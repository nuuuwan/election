import { MathX } from "..";
import { STYLE } from "../../../nonview/constants";

let FormatGeneric = {
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
    return x < minValue ? STYLE.COLOR.LIGHT : "inherit";
  },

  formatWithStyle(
    x,
    strGetter,
    valueRange,
    fontSizeRange,
    colorOverride = null
  ) {
    const strPart = strGetter(x);
    const fontSize = FormatGeneric.getFontSize(x, valueRange, fontSizeRange);
    const color = colorOverride || FormatGeneric.getColor(x, valueRange);
    return (
      <span style={{ fontSize, color }} className="number">
        {strPart}
      </span>
    );
  },
};

FormatGeneric.DEFAULT_FONT_SIZE = STYLE.FONT_SIZE;
FormatGeneric.DEFAULT_FONT_SIZE_RANGE = [
  FormatGeneric.DEFAULT_FONT_SIZE,
  FormatGeneric.DEFAULT_FONT_SIZE * 2,
];
export default FormatGeneric;

import { STYLE } from "../constants";
import MathX from "./MathX";
export default class Color {
  static getOpacity(p) {
    const [minOpacity, maxOpacity] = [0.2, 0.8];
    const [minP, maxP] = [0.5, 0.7];
    const p2 = MathX.forceRange((p - minP) / (maxP - minP), 0, 1);
    const opacity2 = minOpacity + (maxOpacity - minOpacity) * p2;
    const opacity = MathX.forceRange(opacity2, minOpacity, maxOpacity);

    return opacity;
  }

  static getOpacityChar(p) {
    return Math.floor(Color.getOpacity(p) * 16).toString(16);
  }

  static getTextColor(color, opacity) {
    return color === STYLE.COLOR.LIGHTEST
      ? STYLE.COLOR.LIGHTER
      : opacity > 0.5
      ? "white"
      : STYLE.COLOR.DARK;
  }
}

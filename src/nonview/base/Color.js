import MathX from "./MathX";
export default class Color {
  static getOpacity(p) {
    const [minOpacity, maxOpacity] = [0.1, 1.0];
    const [minP, maxP] = [0.45, 0.75];
    const p2 = MathX.forceRange((p - minP) / (maxP - minP), 0, 1);
    const opacity2 = minOpacity + (maxOpacity - minOpacity) * p2;
    const opacity = MathX.forceRange(opacity2, minOpacity, maxOpacity);

    return opacity;
  }

  static getOpacityChar(p) {
    return Math.floor(Color.getOpacity(p) * 16).toString(16);
  }

  static getTextColor(color, opacity) {
    if (color === "ghostwhite") {
      return "lightgray";
    }
    return opacity > 0.5 ? "white" : "black";
  }
}

import MathX from "./MathX";
export default class Color {
  static getOpacity(p) {
    const [minOpacity, maxOpacity] = [0.2, 0.4];
    const [minP, maxP] = [0.45, 0.55];
    const p2 = MathX.forceRange((p - minP) / (maxP - minP), 0, 1);
    return minOpacity + (maxOpacity - minOpacity) * p2;
  }

  static getOpacityChar(p) {
    return Math.floor(Color.getOpacity(p) * 16).toString(16);
  }
}

import MathX from "./MathX";
export default class Color {
  static getOpacity(p) {
    const [minOpacity, maxOpacity] = [0.15, 1.0];
    const [minP, maxP] = [0.5, 0.8];
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

  static getRGB(color) {
    const tempElement = document.createElement("div");
    tempElement.style.color = color;
    document.body.appendChild(tempElement);

    const computedColor = window.getComputedStyle(tempElement).color;

    document.body.removeChild(tempElement);

    const match = computedColor.match(/\d+/g);

    const [r, g, b] = match.map(Number);
    return [r, g, b];
  }

  static getColorWithAlpha(color, alpha) {
    const [r, g, b] = Color.getRGB(color);
    return `rgba(${r},${g},${b},${alpha})`;
  }
}

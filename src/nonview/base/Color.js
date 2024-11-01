import MathX from './MathX';
export default class Color {
  static getOpacity(p) {
    const [minOpacity, maxOpacity] = [0.2, 1.0];
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
    if (color === 'ghostwhite') {
      return 'lightgray';
    }
    return opacity > 0.6 ? 'white' : 'black';
  }

  static getRGB(color) {
    const tempElement = document.createElement('div');
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

  static computeHue([r, g, b]) {
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    let h = 0;
    if (delta !== 0) {
      if (max === r) {
        h = (g - b) / delta + (g < b ? 0 : 6);
      } else if (max === g) {
        h = (b - r) / delta + 2;
      } else {
        h = (r - g) / delta + 4;
      }
    }

    h = (h * 60 + 360) % 360;
    return { h, min, max, delta };
  }

  static getHSV(color) {
    const [r, g, b] = Color.getRGB(color);

    const { h, max, delta } = Color.computeHue([r, g, b]);

    const s = max === 0 ? 0 : delta / max;
    const v = max / 255;

    return [h, s, v];
  }

  static getHue(color) {
    const hue = Color.getHSV(color)[0];

    return hue;
  }

  static getEmoji(color) {
    const hue = Color.getHue(color);
    for (const [hueLimit, emoji] of [
      [30, '🔴'],
      [75, '🟠'],
      [105, '🟡'],
      [150, '🟢'],
      [240, '🔵'],
      [300, '🟣'],
    ]) {
      if (hue < hueLimit) {
        return emoji;
      }
    }
    return '🔴';
  }
}

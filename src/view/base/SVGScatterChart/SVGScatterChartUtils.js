export class SVGScatterChartUtils {
  static P_PADDING = 0.15;
  static SPANS_PER_RADIUS = 50;

  static getBoundParams(points) {
    const xList = points
      .map(function ({ x }) {
        return x;
      })
      .sort();
    const yList = points
      .map(function ({ y }) {
        return y;
      })
      .sort();
    const xMin = Math.min(...xList);
    const xMax = Math.max(...xList);
    const yMin = Math.min(...yList);
    const yMax = Math.max(...yList);
    const xSpan = xMax - xMin;
    const ySpan = yMax - yMin;
    const yPadding = SVGScatterChartUtils.P_PADDING;
    const xPadding = SVGScatterChartUtils.P_PADDING;
    const viewBox = `${-xPadding} ${-yPadding} ${1 + 2 * xPadding} ${
      1 + 2 * yPadding
    }`;
    const radius = 0.01;

    return {
      xMin,
      xMax,
      yMin,
      yMax,
      xSpan,
      ySpan,
      yPadding,
      xPadding,
      viewBox,
      radius,
      transformX: (x) => (x - xMin) / xSpan,
      transformY: (y) => (yMax - y) / ySpan,
    };
  }
}

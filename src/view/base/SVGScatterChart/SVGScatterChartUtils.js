export class SVGScatterChartUtils {
  static P_PADDING = 0.3;
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
    const yPadding = ySpan * SVGScatterChartUtils.P_PADDING;
    const xPadding = xSpan * SVGScatterChartUtils.P_PADDING;
    const viewBox = `${xMin - xPadding} ${yMin - yPadding} ${
      xSpan + xPadding * 2
    } ${ySpan + yPadding * 2}`;
    const radius =
      Math.max(xSpan, ySpan) / SVGScatterChartUtils.SPANS_PER_RADIUS;

    console.debug({ xMin, xMax, yMin, yMax, xSpan, ySpan, n: points.length });

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
    };
  }
}

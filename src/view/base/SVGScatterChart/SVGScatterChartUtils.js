import MLR from 'ml-regression-multivariate-linear';

export class SVGScatterChartUtils {
  static P_PADDING = 0.15;
  static SPANS_PER_RADIUS = 50;

  static extendPoints(points) {
    const X = points.map(({ x }) => [x]);
    const Y = points.map(({ y }) => [y]);

    const mlr = new MLR(X, Y);
    const [[m], [c]] = mlr.weights;

    const extendedPoints = points
      .map(function (point) {
        const { x, y } = point;
        const pDelta = (y - x) / x;
        const dY = Math.abs(m * x + c - y) / Math.sqrt(m * m + 1);
        return Object.assign({}, point, { dY, pDelta });
      })
      .sort((a, b) => b.dY - a.dY);

    return { m, c, extendedPoints };
  }

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

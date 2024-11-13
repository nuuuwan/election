import { SVGScatterChartPoint } from './SVGScatterChartPoint';

export function SVGScatterChartPoints({ points, boundParams }) {
  return points.map(function ({ entID, x, y, xWinningPartyID }) {
    return (
      <SVGScatterChartPoint
        key={entID}
        entID={entID}
        xWinningPartyID={xWinningPartyID}
        x={x}
        y={boundParams.yMax - y}
        radius={boundParams.radius}
      />
    );
  });
}

import { SVGScatterChartPoint } from './SVGScatterChartPoint';

export function SVGScatterChartPoints({
  points,
  boundParams,
  formatStat,
  mode,
}) {
  return points.map(function (point, iPoint) {
    return (
      <SVGScatterChartPoint
        key={point.entID}
        iPoint={iPoint}
        point={point}
        boundParams={boundParams}
        formatStat={formatStat}
        mode={mode}
      />
    );
  });
}

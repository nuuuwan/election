import { SVGScatterChartPointCircle } from './SVGScatterChartPointCircle';
import { SVGScatterChartPointText } from './SVGScatterChartPointText';
export const MAX_OUTLIERS = 5;

export function SVGScatterChartPoint({
  point,
  iPoint,
  boundParams,
  formatStat,
}) {
  return (
    <g>
      <SVGScatterChartPointCircle
        point={point}
        iPoint={iPoint}
        boundParams={boundParams}
        formatStat={formatStat}
      />
      <SVGScatterChartPointText
        point={point}
        iPoint={iPoint}
        boundParams={boundParams}
      />
    </g>
  );
}

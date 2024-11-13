import { SVGScatterChartPointCircle } from './SVGScatterChartPointCircle';
import { SVGScatterChartPointText } from './SVGScatterChartPointText';
export const MAX_OUTLIERS = 5;

export function SVGScatterChartPoint({
  point,
  iPoint,
  boundParams,
  formatStat,
  mode,
}) {
  if (mode === 'circle') {
    return (
      <SVGScatterChartPointCircle
        point={point}
        iPoint={iPoint}
        boundParams={boundParams}
        formatStat={formatStat}
      />
    );
  }
  if (mode === 'text') {
    return (
      <SVGScatterChartPointText
        point={point}
        iPoint={iPoint}
        boundParams={boundParams}
        formatStat={formatStat}
      />
    );
  }
  throw new Error(`Unknown mode: ${mode}`);
}

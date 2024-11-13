import { SVGScatterChartAxisBars } from './SVGScatterChartAxisBars';
import { SVGScatterChartAxisTitle } from './SVGScatterChartAxisTitle';

export function SVGScatterChartAxis({ title, formatStat, boundParams, isX }) {
  return (
    <g>
      <SVGScatterChartAxisTitle
        title={title}
        boundParams={boundParams}
        isX={isX}
      />
      <SVGScatterChartAxisBars
        boundParams={boundParams}
        formatStat={formatStat}
        isX={isX}
      />
    </g>
  );
}

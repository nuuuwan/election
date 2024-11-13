import { MathX } from '../../../nonview';
import { SVGScatterChartAxisBar } from './SVGScatterChartAxisBar';

export function SVGScatterChartAxisBars({ boundParams, formatStat, isX }) {
  const N_AXIS_LABELS = 4;

  return (
    <g>
      {MathX.range(0, N_AXIS_LABELS + 1).map(function (i) {
        return (
          <SVGScatterChartAxisBar
            key={i}
            i={i}
            nAxisLabels={N_AXIS_LABELS}
            formatStat={formatStat}
            boundParams={boundParams}
            isX={isX}
          />
        );
      })}
    </g>
  );
}

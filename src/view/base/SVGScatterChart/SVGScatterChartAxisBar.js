import { SVGScatterChartAxisBarLabel } from './SVGScatterChartAxisBarLabel';
import { SVGScatterChartAxisBarLine } from './SVGScatterChartAxisBarLine';

export function SVGScatterChartAxisBar({
  formatStat,
  nAxisLabels,
  i,
  boundParams,
  isX,
}) {
  const { xMin, xSpan, yMin, ySpan } = boundParams;
  const p = i / nAxisLabels;
  const x = xMin + xSpan * p;
  const y = yMin + ySpan * p;

  return (
    <g key={i}>
      <SVGScatterChartAxisBarLine
        x={x}
        y={y}
        isX={isX}
        boundParams={boundParams}
      />
      <SVGScatterChartAxisBarLabel
        x={x}
        y={y}
        isX={isX}
        boundParams={boundParams}
        formatStat={formatStat}
      />
    </g>
  );
}

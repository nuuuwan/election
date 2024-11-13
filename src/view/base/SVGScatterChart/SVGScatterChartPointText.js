import { MAX_OUTLIERS } from './SVGScatterChartPoint';
import SVGScatterChartPointToolTip from './SVGScatterChartPointToolTip';

export function SVGScatterChartPointText({
  point,
  iPoint,
  boundParams,
  formatStat,
}) {
  const { ent, x, y } = point;
  const { radius, transformX, transformY } = boundParams;

  const isOutlier = iPoint < MAX_OUTLIERS;
  if (!isOutlier) {
    return null;
  }

  return (
    <text
      x={transformX(x) + radius}
      y={transformY(y)}
      fontSize={radius * 2}
      fill="black"
      textAnchor="start"
      dominantBaseline="middle"
    >
      <SVGScatterChartPointToolTip point={point} formatStat={formatStat} />
      {ent.name}
    </text>
  );
}

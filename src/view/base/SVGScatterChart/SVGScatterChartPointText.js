import { MAX_OUTLIERS } from './SVGScatterChartPoint';

export function SVGScatterChartPointText({ point, iPoint, boundParams }) {
  const { ent, x, y } = point;
  const { radius, transformY } = boundParams;

  const isOutlier = iPoint < MAX_OUTLIERS;
  if (!isOutlier) {
    return null;
  }

  return (
    <text
      x={x + radius}
      y={transformY(y)}
      fontSize={radius * 2}
      fill="black"
      textAnchor="start"
      dominantBaseline="middle"
    >
      {ent.name}
    </text>
  );
}

import { MAX_OUTLIERS } from './SVGScatterChartPoint';

export function SVGScatterChartPointText({ point, iPoint, boundParams }) {
  const { ent, x, y } = point;
  const { radius } = boundParams;

  const isOutlier = iPoint < MAX_OUTLIERS;
  if (!isOutlier) {
    return null;
  }

  return (
    <text
      x={x + radius}
      y={y}
      fontSize={radius * 2}
      fill="black"
      textAnchor="start"
      dominantBaseline="middle"
    >
      {ent.name}
    </text>
  );
}

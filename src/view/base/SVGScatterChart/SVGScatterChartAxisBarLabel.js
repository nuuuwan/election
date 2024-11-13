export function SVGScatterChartAxisBarLabel({
  x,
  y,
  boundParams,
  formatStat,
  isX,
}) {
  const { xMin, yMin, radius, yPadding, xPadding, transformY } = boundParams;

  if (isX) {
    return (
      <text
        x={x}
        y={transformY(yMin) + yPadding / 3}
        fontSize={radius * 2}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {formatStat(x)}
      </text>
    );
  }
  return (
    <text
      x={xMin - xPadding / 3}
      y={transformY(y)}
      fontSize={radius * 2}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {formatStat(y)}
    </text>
  );
}

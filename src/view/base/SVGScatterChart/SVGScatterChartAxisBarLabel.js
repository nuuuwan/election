export function SVGScatterChartAxisBarLabel({
  x,
  y,
  boundParams,
  formatStat,
  isX,
}) {
  const { xMin, yMin, yMax, radius, yPadding, xPadding } = boundParams;

  if (isX) {
    return (
      <text
        x={x}
        y={yMax - (yMin - yPadding / 3)}
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
      y={yMax - y}
      fontSize={radius * 2}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {formatStat(y)}
    </text>
  );
}

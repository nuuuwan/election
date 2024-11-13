export function SVGScatterChartAxisBarLabel({
  x,
  y,
  boundParams,
  formatStat,
  isX,
}) {
  const { xMin, yMin, radius, yPadding, xPadding, transformX, transformY } =
    boundParams;
  const P_FROM_PADDING = 0.25;
  const STYLE = {
    fontSize: radius * 3,
    textAnchor: 'middle',
    dominantBaseline: 'middle',
  };
  if (isX) {
    return (
      <text
        x={transformX(x)}
        y={transformY(yMin) + yPadding * P_FROM_PADDING}
        {...STYLE}
      >
        {formatStat(x)}
      </text>
    );
  }
  return (
    <text
      x={transformX(xMin) - xPadding * P_FROM_PADDING}
      y={transformY(y)}
      {...STYLE}
    >
      {formatStat(y)}
    </text>
  );
}

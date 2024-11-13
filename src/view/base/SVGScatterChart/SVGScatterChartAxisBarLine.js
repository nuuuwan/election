export function SVGScatterChartAxisBarLine({ x, y, boundParams, isX }) {
  const { xMin, xMax, yMin, yMax, radius, transformX, transformY } =
    boundParams;
  const STYLE = {
    stroke: '#888',
    strokeWidth: radius / 20,
  };
  if (isX) {
    return (
      <line
        x1={transformX(x)}
        x2={transformX(x)}
        y1={transformY(yMin)}
        y2={transformY(yMax)}
        {...STYLE}
      />
    );
  }
  return (
    <line
      x1={transformX(xMin)}
      x2={transformX(xMax)}
      y1={transformY(y)}
      y2={transformY(y)}
      {...STYLE}
    />
  );
}

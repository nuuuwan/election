export function SVGScatterChartAxisBarLine({ x, y, boundParams, isX }) {
  const { xMin, xMax, yMin, yMax, radius, transformY } = boundParams;
  if (isX) {
    return (
      <line
        x1={x}
        x2={x}
        y1={transformY(yMin)}
        y2={transformY(yMax)}
        stroke={'#888'}
        strokeWidth={radius / 20}
      />
    );
  }
  return (
    <line
      x1={xMin}
      x2={xMax}
      y1={transformY(y)}
      y2={transformY(y)}
      stroke={'#888'}
      strokeWidth={radius / 20}
    />
  );
}

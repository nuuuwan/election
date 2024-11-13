export function SVGScatterChartAxisBarLine({ x, y, boundParams, isX }) {
  const { xMin, xMax, yMin, yMax, radius } = boundParams;
  if (isX) {
    return (
      <line
        x1={x}
        x2={x}
        y1={yMin}
        y2={yMax}
        stroke={'#888'}
        strokeWidth={radius / 20}
      />
    );
  }
  return (
    <line
      x1={xMin}
      x2={xMax}
      y1={y}
      y2={y}
      stroke={'#888'}
      strokeWidth={radius / 20}
    />
  );
}

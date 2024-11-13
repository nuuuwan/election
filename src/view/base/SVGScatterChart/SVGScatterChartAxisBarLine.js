export function SVGScatterChartAxisBarLine({ x, y, boundParams, isX }) {
  const { xMin, xMax, yMin, yMax, radius } = boundParams;
  if (isX) {
    return (
      <line
        x1={x}
        x2={x}
        y1={yMax - yMin}
        y2={yMax - yMax}
        stroke={'#888'}
        strokeWidth={radius / 20}
      />
    );
  }
  return (
    <line
      x1={xMin}
      x2={xMax}
      y1={yMax - y}
      y2={yMax - y}
      stroke={'#888'}
      strokeWidth={radius / 20}
    />
  );
}

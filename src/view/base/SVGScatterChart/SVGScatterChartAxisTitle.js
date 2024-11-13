export function SVGScatterChartAxisTitle({ title, boundParams, isX }) {
  const { xMin, xSpan, yMin, xPadding, yPadding, radius, ySpan } = boundParams;
  let xText, yText, transform;
  if (isX) {
    xText = xMin + xSpan / 2;
    yText = yMin - (yPadding * 2) / 3;
    transform = '';
  } else {
    xText = xMin - (xPadding * 2) / 3;
    yText = yMin + ySpan / 2;
    transform = `rotate(-90, ${xText}, ${yText})`;
  }

  return (
    <text
      x={xText}
      y={yText}
      transform={transform}
      fontSize={radius * 3}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {title}
    </text>
  );
}

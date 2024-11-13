export function SVGScatterChartAxisTitle({ title, boundParams, isX }) {
  const { xPadding, yPadding, radius } = boundParams;
  let xText, yText, transform;
  const P_FROM_PADDING = 0.75;
  if (isX) {
    xText = 0.5;
    yText = 1 + yPadding * P_FROM_PADDING;
    transform = '';
  } else {
    xText = 0 - xPadding * P_FROM_PADDING;
    yText = 0.5;
    transform = `rotate(-90, ${xText}, ${yText})`;
  }

  return (
    <text
      x={xText}
      y={yText}
      transform={transform}
      fontSize={radius * 4}
      textAnchor="middle"
      dominantBaseline="middle"
    >
      {title}
    </text>
  );
}

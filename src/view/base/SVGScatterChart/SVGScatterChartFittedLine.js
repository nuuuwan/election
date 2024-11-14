export function SVGScatterChartFittedLine({ boundParams }) {
  const [m, c] = [1, 0];
  const { xMin, xMax, transformX, transformY } = boundParams;
  const x1 = transformX(xMin);
  const x2 = transformX(xMax);
  const y1 = transformY(m * xMin + c);
  const y2 = transformY(m * xMax + c);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#888"
      strokeWidth="0.005"
      strokeDasharray="0.01 0.01"
    />
  );
}

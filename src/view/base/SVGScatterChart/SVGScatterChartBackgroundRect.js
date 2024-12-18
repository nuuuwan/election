export function SVGScatterChartBackgroundRect({ boundParams }) {
  const { yPadding, xPadding } = boundParams;
  return (
    <g>
      <rect
        x={-xPadding}
        y={-yPadding}
        width={1 + xPadding * 2}
        height={1 + yPadding * 2}
        fill={'#fefefe'}
      />
      <rect x={0} y={0} width={1} height={1} fill={'#fdfdfd'} />
    </g>
  );
}

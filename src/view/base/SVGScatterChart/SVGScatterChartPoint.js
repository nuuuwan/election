import { Party } from '../../../nonview';

export function SVGScatterChartPoint({ entID, xWinningPartyID, x, y, radius }) {
  const color = Party.fromID(xWinningPartyID).color;
  return (
    <g key={entID}>
      <circle cx={x} cy={y} r={radius} fill={color} fillOpacity={0.5} />
    </g>
  );
}

import { Party } from '../../../nonview';
import SVGScatterChartPointToolTip from './SVGScatterChartPointToolTip';
const UNIT_POLLED = 20_000;

export function SVGScatterChartPointCircle({
  point,

  boundParams,
  formatStat,
}) {
  const { resultY, x, y } = point;
  const { radius, transformX, transformY } = boundParams;
  const xWinningPartyID = resultY.winningPartyID;
  const color = Party.fromID(xWinningPartyID).color;

  const polled = resultY.summary.polled;
  const radiusScaled = radius * Math.sqrt(polled / UNIT_POLLED);

  return (
    <circle
      cx={transformX(x)}
      cy={transformY(y)}
      r={radiusScaled}
      fill={color}
      fillOpacity={0.5}
      stroke="white"
      strokeWidth={0.001}
    >
      <SVGScatterChartPointToolTip point={point} formatStat={formatStat} />
    </circle>
  );
}

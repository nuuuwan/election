import { Party } from '../../../nonview';
import { MAX_OUTLIERS } from './SVGScatterChartPoint';

export function SVGScatterChartPointCircle({
  point,
  iPoint,
  boundParams,
  formatStat,
}) {
  const { ent, resultY, x, y } = point;
  const { radius } = boundParams;
  const xWinningPartyID = resultY.winningPartyID;
  const color = Party.fromID(xWinningPartyID).color;
  const toolTip = `${ent.name} ${formatStat(x)} ➡ ${formatStat(y)}`;
  const isOutlier = iPoint < MAX_OUTLIERS;
  const fillOpacity = isOutlier ? 1 : 0.333;
  return (
    <circle cx={x} cy={y} r={radius} fill={color} fillOpacity={fillOpacity}>
      <title>{toolTip}</title>
    </circle>
  );
}

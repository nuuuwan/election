import { Format, Party } from '../../../nonview';
import { MAX_OUTLIERS } from './SVGScatterChartPoint';

export function SVGScatterChartPointCircle({
  point,
  iPoint,
  boundParams,
  formatStat,
}) {
  const { ent, resultY, x, y, pDelta } = point;
  const { radius, transformY } = boundParams;
  const xWinningPartyID = resultY.winningPartyID;
  const color = Party.fromID(xWinningPartyID).color;
  const toolTip = `${ent.name} ${formatStat(x)} ➡ ${formatStat(
    y,
  )} (${Format.percentSigned(pDelta)})`;
  const isOutlier = iPoint < MAX_OUTLIERS;
  const fillOpacity = isOutlier ? 1 : 0.333;
  return (
    <circle
      cx={x}
      cy={transformY(y)}
      r={radius}
      fill={color}
      fillOpacity={fillOpacity}
    >
      <title>{toolTip}</title>
    </circle>
  );
}

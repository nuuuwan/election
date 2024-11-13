import { Format } from '../../../nonview';

export default function SVGScatterChartPointToolTip({ point, formatStat }) {
  const { ent, x, y, pDelta } = point;
  const toolTip = `${ent.name} ${formatStat(x)} ➡ ${formatStat(
    y,
  )} (${Format.percentSigned(pDelta)})`;
  return <title>{toolTip}</title>;
}

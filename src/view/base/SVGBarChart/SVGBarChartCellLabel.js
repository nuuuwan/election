import SVGLabel from "./SVGLabel";
import {useSVGBarChartContext} from "./SVGBarChartContextProvider";

export default function SVGBarChartCellLabel({
  data,
  i,
  value,
  j,
  x,
}) {

  const { pHeight, n, formatValue } = useSVGBarChartContext();
  
  const height = pHeight / n;
  const y = height * i;
  const width = value;  

  const label = formatValue ? formatValue(data, i, value, j) : null;
  if (!label) {
    return null;
  }

  return <SVGLabel x0={x} y0={y} width={width} height={height} label={label} />;
}

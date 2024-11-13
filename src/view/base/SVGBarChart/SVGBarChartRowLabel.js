import { MathX } from "../../../nonview";
import SVGLabel from "./SVGLabel";
import { useSVGBarChartContext } from "./SVGBarChartContextProvider";
export default function SVGBarChartRowLabel({
  data,
  i,
}) {
  const { pHeight, n, getValues, formatRowValue } = useSVGBarChartContext();

  const rowValue = formatRowValue ? formatRowValue(data, i) : " ";
  if (!rowValue) {
    return null;
  }

  const rowWidth = MathX.sum(getValues(data, i));
  const rowHeight = pHeight / n;

  return (
    <SVGLabel
      x0={0}
      y0={i * rowHeight}
      width={rowWidth}
      height={rowHeight}
      label={rowValue}
    />
  );
}

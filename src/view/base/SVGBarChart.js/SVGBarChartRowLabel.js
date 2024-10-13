import { MathX } from "../../../nonview";
import SVGLabel from "./SVGLabel";

export default function SVGBarChartRowLabel({
    getValues,
    formatRowValue,
    n,
    data,
    i,
    pHeight,
}) {
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

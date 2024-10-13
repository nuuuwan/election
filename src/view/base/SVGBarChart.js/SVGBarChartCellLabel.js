import SVGLabel from "./SVGLabel";

export default function SVGBarChartCellLabel({
    formatValue,
    data,
    i,
    value,
    j,
    x,
    y,
    width,
    height,
}) {
    const label = formatValue ? formatValue(data, i, value, j) : null;
    if (!label) {
        return null;
    }

    return <SVGLabel x0={x} y0={y} width={width} height={height} label={label} />;
}

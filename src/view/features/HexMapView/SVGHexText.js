import { Translate, StringX } from "../../../nonview";

export default function SVGHexText({ x, y, color, label, onClick, isSmall }) {
    label = label.replace("Postal ", "");
    label = label.replace("-", " ");
    const translatedLabel = Translate(label);
    const shortLabel = StringX.getShortLabel(translatedLabel);

    return (
        <text
            onClick={onClick}
            x={x}
            y={y}
            fontSize={StringX.getFontSize(shortLabel) / (isSmall ? 3 : 1)}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={color}
        >
            <title>{translatedLabel}</title>
            {shortLabel}
        </text>
    );
}

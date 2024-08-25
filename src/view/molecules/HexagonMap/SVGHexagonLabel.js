import { Color, Translate, StringX } from "../../../nonview/base";



export default function SVGHexagonLabel({ x, y, color, label, opacity, onClick }) {


  const textColor = Color.getTextColor(color, opacity);
  label = label.replace("Postal ", "");
  label = label.replace("-", " ");
  const translatedLabel = Translate(label);
  const shortLabel = StringX.getShortLabel(translatedLabel);
  return (

      <text onClick={onClick}
        x={x}
        y={y + 0.1}
        fontSize={StringX.getFontSize(shortLabel)}
        textAnchor="middle"
        alignmentBaseline="center"
        dominantBaseline={"center"}
        fill={textColor}
      >
        <title>{translatedLabel}</title>
        {shortLabel}
      </text>

  );
}

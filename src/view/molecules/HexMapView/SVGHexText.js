import { Translate, StringX } from "../../../nonview/base";

export default function SVGHexText({ x, y, color, label, onClick }) {
  label = label.replace("Postal ", "");
  label = label.replace("-", " ");
  const translatedLabel = Translate(label);
  const shortLabel = StringX.getShortLabel(translatedLabel);

  return (
    <text
      onClick={onClick}
      x={x}
      y={y + 0.1}
      fontSize={StringX.getFontSize(shortLabel)}
      textAnchor="middle"
      alignmentBaseline="center"
      dominantBaseline={"center"}
      fill={color}
    >
      <title>{translatedLabel}</title>
      {shortLabel}
    </text>
  );
}

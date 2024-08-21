import { Color, MathX, Translate, StringX } from "../../../nonview/base";

import { STYLE } from "../../../nonview/constants";



function getPoints(x, y, radius) {
  const N_SIDES = 6;

  return MathX.range(0, N_SIDES)
    .map(function (i) {
      const angle = (i * Math.PI * 2) / N_SIDES;
      return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
    })
    .map(function ([x, y]) {
      return `${x},${y}`;
    })
    .join(" ");
}

function getFontSize(shortLabel) {
  const k = StringX.isEn(shortLabel) ? 1.2 : 2.7;
  const nMax = StringX.isEn(shortLabel) ? 3 : 6;
  return k / Math.max(shortLabel.length, nMax);
}

export default function SVGHexagon({ x, y, color, label, opacity, onClick }) {
  const radius = 1 / Math.cos(Math.PI / 6) ** 2 / 2;
  const points = getPoints(x, y, radius);
  const textColor = Color.getTextColor(color, opacity);
  label = label.replace("Postal ", "");
  label = label.replace('-', " ")
  const translatedLabel = Translate(label);
  const shortLabel = StringX.getShortLabel(translatedLabel);
  return (
    <g onClick={onClick}>
      <polygon
        points={points}
        fill={color}
        opacity={opacity}
        stroke={STYLE.COLOR.LIGHTER}
        strokeWidth={0.05}
      />
      <text
        x={x}
        y={y + 0.1}
        fontSize={getFontSize(shortLabel)}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={textColor}
      >
        <title>{translatedLabel}</title>
        {shortLabel}
      </text>
    </g>
  );
}

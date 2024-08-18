import { Color, MathX } from "../../../nonview/base";

import { STYLE } from "../../../nonview/constants";

function replaceLowercaseVowels(str) {
  return str.replace(/[aeiou]/g, "");
}

function getShortLabel(name) {
  name = name.replace("Postal ", "");
  name = replaceLowercaseVowels(name);
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 3).toUpperCase();
  }
  return words.map((word) => word.substring(0, 1)).join("");
}


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

export default function SVGHexagon({ x, y, color, label, opacity, onClick }) {
  const radius = 1 / Math.cos(Math.PI / 6) ** 2 / 2;
  const points = getPoints(x, y, radius);
  const textColor = Color.getTextColor(color, opacity);
  const shortLabel = getShortLabel(label)
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
        fontSize={(0.4 * 3) / Math.max(3, shortLabel.length)}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={textColor}
      > 
        <title>{label}</title>
        {shortLabel}
      </text>
    </g>
  );
}

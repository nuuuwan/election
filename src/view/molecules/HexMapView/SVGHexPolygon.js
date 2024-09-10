import { MathX } from "../../../nonview/base";

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

export default function SVGHexPolygon({ x, y, color, opacity, onClick }) {
  const radius = 1 / Math.cos(Math.PI / 6) ** 2 / 2;
  const points = getPoints(x, y, radius);

  return (
    <polygon
      onClick={onClick}
      points={points}
      fill={color}
      opacity={opacity}
      stroke={"gray"}
      strokeWidth={0.02}
    />
  );
}

import { Color, Format } from "../../../nonview/base";

import SVGHexPolygon from "./SVGHexPolygon";
import SVGHexText from "./SVGHexText";

export default function SVGLegendPercentages({ x, y }) {
  const N_COLS = 2;

  return [0.5, 0.6, 0.7].map(function (p, i) {
    const [x1, y1] = [
      x + parseInt(i / N_COLS),
      y +
        ((i % N_COLS) + (parseInt(i / N_COLS) % 2 === 1 ? 0.5 : 0)) /
          Math.cos(Math.PI / 6),
    ];

    const opacity = Color.getOpacity(p);

    return (
      <g key={i}>
        <SVGHexPolygon
          key={i}
          x={x1}
          y={y1}
          color={"black"}
          label={Format.percent(p)}
          opacity={opacity}
        />
        <SVGHexText
          x={x1}
          y={y1}
          label={Format.percent(p)}
          color={Color.getTextColor("black", opacity)}
        />
      </g>
    );
  });
}

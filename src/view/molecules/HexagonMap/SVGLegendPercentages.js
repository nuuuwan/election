
import { Color, Format } from "../../../nonview/base";

import SVGHexagon from "./SVGHexagon";
import SVGHexagonLabel from "./SVGHexagonLabel";

export default function SVGLegendPercentages({ x, y }) {
  const N_COLS = 2;

  return [0.25, 0.5, 0.75].map(function (p, i) {
    const [x1, y1] = [
      x + parseInt(i / N_COLS),
      y +
        ((i % N_COLS) + (parseInt(i / N_COLS) % 2 === 1 ? 0.5 : 0)) /
          Math.cos(Math.PI / 6),
    ];

    return (
      <g key={i}>
        <SVGHexagon
          key={i}
          x={x1}
          y={y1}
          color={"secondary"}
          label={Format.percent(p)}
          opacity={Color.getOpacity(p)}
        />
        <SVGHexagonLabel
          x={x1}
          y={y1}
          color={"primary"}
          label={Format.percent(p)}
          opacity={1}
        />
      </g>
    );
  });
}

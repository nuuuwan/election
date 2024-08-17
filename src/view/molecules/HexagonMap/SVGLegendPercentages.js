import { STYLE } from "../../../nonview/constants";
import { Color, Format } from "../../../nonview/base";


import SVGHexagon from "./SVGHexagon";

export default function SVGLegendPercentages({ x, y }) {
  const N_COLS = 2;
  return [0.25, 0.5, 0.75].map(function (p, i) {
    return (
      <SVGHexagon
        key={i}
        x={x + parseInt(i / N_COLS)}
        y={
          y +
          ((i % N_COLS) + (parseInt(i / N_COLS) % 2 === 1 ? 0.5 : 0)) /
            Math.cos(Math.PI / 6)
        }
        color={STYLE.COLOR.LIGHT}
        label={Format.percent(p)}
        opacity={Color.getOpacity(p)}
      />
    );
  });
}

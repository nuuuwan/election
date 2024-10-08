import React from "react";
import SVGSeatCircleCircle from "./SVGSeatCircleCircle";
import SVGSeatCircleText from "./SVGSeatCircleText";

const R_CIRCLE = 0.33;
const ALPHA0 = -Math.PI / 2;


export default function SVGSeatCircle({ i, n, x, y, partyID, seats }) {
  const alpha = ALPHA0 + ((n - i - 1) * 2 * Math.PI) / n;
  const cx = x + R_CIRCLE * Math.cos(alpha);
  const cy = y + R_CIRCLE * Math.sin(alpha);

  return (
    <g>
      <SVGSeatCircleCircle cx={cx} cy={cy} partyID={partyID} />
      <SVGSeatCircleText x={cx} y={cy} partyID={partyID} seats={seats} />
    </g>
  );
}

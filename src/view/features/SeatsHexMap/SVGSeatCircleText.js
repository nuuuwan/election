import React from "react";

import { Party } from "../../../nonview";

const R_CIRCLE = 0.33;

export default function SVGSeatCircleText({ x, y, partyID, seats }) {
  let colorText = "white";

  if (partyID === Party.ERROR.id) {
    colorText = "gray";
  }

  const fontSize = R_CIRCLE * 0.8;

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={colorText}
      fontSize={fontSize}
    >
      {seats}
    </text>
  );
}

import React from "react";


import { Party,  } from "../../../nonview";


const R_CIRCLE = 0.33;



export default function SVGSeatCircleCircle({ cx, cy, partyID }) {
  let color = Party.fromID(partyID).color;
  let stroke = "#fff";
  let strokeDasharray = null;

  if (partyID === Party.ERROR.id) {
    color = "white";
    stroke = "lightgray";
    strokeDasharray = R_CIRCLE / 10;
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={R_CIRCLE * 0.6}
      fill={color}
      stroke={stroke}
      strokeDasharray={strokeDasharray}
      strokeWidth={R_CIRCLE / 10}
    />
  );
}

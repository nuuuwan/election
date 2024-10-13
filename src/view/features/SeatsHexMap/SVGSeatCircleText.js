import React from "react";

import { Party } from "../../../nonview";

const R_CIRCLE = 0.33;

export default function SVGSeatCircleText({ x, y, partyID, seats }) {
    let colorText = "white";

    if (partyID === Party.ERROR.id) {
        colorText = "gray";
    }

    return (
        <text
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={colorText}
            fontSize={R_CIRCLE * 0.8}
        >
            {seats}
        </text>
    );
}

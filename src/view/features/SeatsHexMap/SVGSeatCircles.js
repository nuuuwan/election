import React from "react";

import SVGSeatCircle from "./SVGSeatCircle";

export default function SVGSeatCircles({ x, y, partyToSeats }) {
  if (!partyToSeats) {
    return null;
  }
  const n = Object.keys(partyToSeats).length;

  return (
    <g>
      {Object.entries(partyToSeats)
        .reverse()
        .map(function ([partyID, seats], i) {
          return (
            <SVGSeatCircle
              key={i}
              i={i}
              n={n}
              x={x}
              y={y}
              partyID={partyID}
              seats={seats}
            />
          );
        })}
    </g>
  );
}

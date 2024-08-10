import { MathX } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";

function SVGHexagon({ x, y, color }) {
  const N_SIDES = 6;
  const X_TO_Y_RATIO = 1 / Math.cos(Math.PI / 6);
  const radius = 0.55;
  const points = MathX.range(0, N_SIDES)
    .map(function (i) {
      const angle = (i * Math.PI * 2) / N_SIDES;
      return [
        x + radius * Math.cos(angle),
        (y + radius * Math.sin(angle)) * X_TO_Y_RATIO,
      ];
    })
    .map(function ([x, y]) {
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <polygon points={points} fill={color} stroke="white" strokeWidth={0.1} />
  );
}

export default function HexagonMap({ resultIdx }) {
  return (
    <svg
      width={window.innerWidth / 3}
      height={window.innerHeight}
      viewBox="-2 -3 15 35"
    >
      {Object.entries(HEXAGON_MAP_DATA_PD).map(function ([entID, [x, y]]) {
        const result = resultIdx[entID];
        const winningPartyID = result.partyToVotes.winningPartyID;
        const color = Party.fromID(winningPartyID).color;
        return <SVGHexagon x={x} y={y} color={color} />;
      })}
    </svg>
  );
}

import { MathX } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";
import HEXAGON_MAP_DATA_ED from "./HEXAGON_MAP_DATA_ED";
import { STYLE } from "../../../nonview/constants";

function SVGHexagon({ x, y, color, label, isActive }) {
  const N_SIDES = 6;
  const X_TO_Y_RATIO = 1 / Math.cos(Math.PI / 6);
  const radius = 0.5;
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

  let opacity = 0.5;
  if (isActive) {
    opacity = 1;
  }

  return (
    <g>
      <polygon points={points} fill={color} opacity={opacity} stroke="none" />
      <text
        x={x}
        y={y * X_TO_Y_RATIO}
        fontSize={0.4}
        fontFamily={STYLE.FONT_FAMILY}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill="white"
      >
        {label}
      </text>
    </g>
  );
}

export default function HexagonMap({ resultIdx, result: activeResult }) {
  return (
    <svg
      width={window.innerWidth / 3}
      height={window.innerHeight}
      viewBox="-2 -3 15 35"
    >
      {[]
        .concat(
          Object.entries(HEXAGON_MAP_DATA_PD),
          Object.entries(HEXAGON_MAP_DATA_ED).map(function ([entID, [x, y]]) {
            return [entID + "P", [x + 9, y - 1]];
          })
        )
        .map(function ([entID, [x, y]]) {
          const result = resultIdx[entID];
          const label = entID.substring(3, 6);
          const winningPartyID = result.partyToVotes.winningPartyID;
          const color = Party.fromID(winningPartyID).color;
          const isActive = result.entID === activeResult.entID;
          return (
            <SVGHexagon
              x={x}
              y={y}
              color={color}
              label={label}
              isActive={isActive}
            />
          );
        })}
    </svg>
  );
}

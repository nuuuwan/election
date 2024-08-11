import { MathX } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";
import HEXAGON_MAP_DATA_ED from "./HEXAGON_MAP_DATA_ED";
import { STYLE } from "../../../nonview/constants";

function SVGHexagon({ x, y, color, label, isActive, opacity }) {
  const N_SIDES = 6;

  const radius = 1 / Math.cos(Math.PI / 6) ** 2 / 2;
  const points = MathX.range(0, N_SIDES)
    .map(function (i) {
      const angle = (i * Math.PI * 2) / N_SIDES;
      return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
    })
    .map(function ([x, y]) {
      return `${x},${y}`;
    })
    .join(" ");

  const textColor = isActive ? "#000" : "#fff";

  return (
    <g>
      <polygon
        points={points}
        fill={color}
        opacity={opacity}
        stroke="#ccc"
        strokeWidth={0.05}
      />
      <text
        x={x}
        y={y + 0.1}
        fontSize={0.4}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );
}

function SVGTitles() {
  return (
    <g fontSize={0.5} textAnchor="middle" fill="#888">
      <text x={11} y={-4}>
        {"22 Postal Votes".toUpperCase()}
      </text>
      <text x={5} y={1}>
        {"160 Polling Divisions".toUpperCase()}
      </text>
    </g>
  );
}

function SVGLegend({ resultIdx }) {
  const partyToWins = Object.values(resultIdx).reduce(function (
    partyToWins,
    result
  ) {
    const winningPartyID = result.partyToVotes.winningPartyID;
    if (!partyToWins[winningPartyID]) {
      partyToWins[winningPartyID] = 0;
    }
    partyToWins[winningPartyID]++;
    return partyToWins;
  },
  {});
  const N_COLS = 2;
  return Object.entries(partyToWins)
    .sort(function ([partyID1, nWins1], [partyID2, nWins2]) {
      return nWins2 - nWins1;
    })
    .map(function ([partyID, nWins], iParty) {
      const party = Party.fromID(partyID);
      return (
        <SVGHexagon
          key={partyID}
          x={1 + parseInt(iParty / N_COLS)}
          y={
            ((iParty % N_COLS) -
              3 +
              (parseInt(iParty / N_COLS) % 2 === 1 ? 0.5 : 0)) /
            Math.cos(Math.PI / 6)
          }
          color={party.color}
          label={partyID}
        />
      );
    });
}

function SVGMap({ resultIdx, activeResult }) {
  return []
    .concat(
      Object.entries(HEXAGON_MAP_DATA_PD),
      Object.entries(HEXAGON_MAP_DATA_ED).map(function ([entID, [x, y]]) {
        return [entID + "P", [x + 9, y - 2]];
      })
    )

    .map(function ([entID, [x, y]]) {
      const result = resultIdx[entID];
      const label = entID.substring(3, 6);

      let color = "#fff";
      let opacity = 1;
      let isActive = false;
      if (result) {
        const winningPartyID = result.partyToVotes.winningPartyID;
        color = Party.fromID(winningPartyID).color;
        isActive = result.entID === activeResult.entID;
        opacity =
          0.5 +
          (0.5 * Math.max(0, result.partyToVotes.pWinner - 0.5)) / (1 - 0.5);
      }

      return (
        <SVGHexagon
          key={entID}
          x={x}
          y={y / Math.cos(Math.PI / 6)}
          color={color}
          opacity={opacity}
          label={label}
          isActive={isActive}
        />
      );
    });
}

export default function HexagonMap({ resultIdx, activeResult }) {
  return (
    <svg
      width={STYLE.COLUMN_WIDTH}
      height={STYLE.HEIGHT}
      viewBox="2 -5 9 33"
      fontFamily={STYLE.FONT_FAMILY}
    >
      <SVGTitles />
      <SVGLegend resultIdx={resultIdx} />
      <SVGMap resultIdx={resultIdx} activeResult={activeResult} />
    </svg>
  );
}

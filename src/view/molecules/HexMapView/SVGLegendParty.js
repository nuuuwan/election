import { Party } from "../../../nonview/core";
import { useDataContext } from "../../../nonview/core/DataProvider";

import SVGHexPolygon from "./SVGHexPolygon";
import StyleHexMap from "./StyleHexMap";
import SVGHexText from "./SVGHexText";

export default function SVGLegendParty({ x, y }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election } = data;
  const partyToWins = election.getPartyToWins();

  return Object.entries(partyToWins)
    .sort(function ([partyID1, nWins1], [partyID2, nWins2]) {
      return nWins2 - nWins1;
    })
    .map(function ([partyID, nWins], i) {
      const party = Party.fromID(partyID);

      const [x1, y1] = [
        x + parseInt(i / StyleHexMap.N_COLS),
        y +
          ((i % StyleHexMap.N_COLS) +
            (parseInt(i / StyleHexMap.N_COLS) % 2 === 1 ? 0.5 : 0)) /
            Math.cos(Math.PI / 6),
      ];

      return (
        <g key={partyID}>
          <SVGHexPolygon
            x={x1}
            y={y1}
            color={party.color}
            label={partyID}
            opacity={1}
          />
          <SVGHexText
            x={x1}
            y={y1}
            color={party.color}
            label={partyID}
            opacity={1}
          />
        </g>
      );
    });
}

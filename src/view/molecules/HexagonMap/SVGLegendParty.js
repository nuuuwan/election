import { useContext } from "react";
import { DataContext, Party } from "../../../nonview/core";

import SVGHexagon from "./SVGHexagon";
import StyleHexagonMap from "./StyleHexagonMap";

export default function SVGLegendParty({ x, y }) {

  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const {election} = data;
  const partyToWins = election.getPartyToWins();

  return Object.entries(partyToWins)
    .sort(function ([partyID1, nWins1], [partyID2, nWins2]) {
      return nWins2 - nWins1;
    })
    .map(function ([partyID, nWins], i) {
      const party = Party.fromID(partyID);
      return (
        <SVGHexagon
          key={partyID}
          x={x + parseInt(i / StyleHexagonMap.N_COLS)}
          y={
            y +
            ((i % StyleHexagonMap.N_COLS) +
              (parseInt(i / StyleHexagonMap.N_COLS) % 2 === 1 ? 0.5 : 0)) /
              Math.cos(Math.PI / 6)
          }
          color={party.color}
          label={partyID}
          opacity={1}
        />
      );
    });
}

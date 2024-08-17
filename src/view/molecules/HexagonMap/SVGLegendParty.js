import { Color } from "../../../nonview/base";
import { Party } from "../../../nonview/core";

import SVGHexagon from "./SVGHexagon";

export default function SVGLegendParty({ election, x, y }) {
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
          x={x + parseInt(i / Color.N_COLS)}
          y={
            y +
            ((i % Color.N_COLS) +
              (parseInt(i / Color.N_COLS) % 2 === 1 ? 0.5 : 0)) /
              Math.cos(Math.PI / 6)
          }
          color={party.color}
          label={partyID}
          opacity={1}
        />
      );
    });
}

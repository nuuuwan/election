import { Party } from "../../../nonview/core";
import HexagonUtils from "./HexagonUtils";
import SVGHexagon from "./SVGHexagon";

export default function SVGLegendParty({ resultsIdx, x, y }) {
  const partyToWins = HexagonUtils.getPartyToWins(resultsIdx);

  return Object.entries(partyToWins)
    .sort(function ([partyID1, nWins1], [partyID2, nWins2]) {
      return nWins2 - nWins1;
    })
    .map(function ([partyID, nWins], i) {
      const party = Party.fromID(partyID);
      return (
        <SVGHexagon
          key={partyID}
          x={x + parseInt(i / HexagonUtils.N_COLS)}
          y={
            y +
            ((i % HexagonUtils.N_COLS) +
              (parseInt(i / HexagonUtils.N_COLS) % 2 === 1 ? 0.5 : 0)) /
              Math.cos(Math.PI / 6)
          }
          color={party.color}
          label={partyID}
          opacity={1}
        />
      );
    });
}

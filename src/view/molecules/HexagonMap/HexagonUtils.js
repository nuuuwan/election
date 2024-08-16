import { MathX } from "../../../nonview/base";

export default class HexagonUtils {
  static N_COLS = 2;
  static getOpacity(p) {
    const [minOpacity, maxOpacity] = [0.2, 0.4];
    const [minP, maxP] = [0.45, 0.55];
    const p2 = MathX.forceRange((p - minP) / (maxP - minP), 0, 1);
    return minOpacity + (maxOpacity - minOpacity) * p2;
  }

  static getPartyToWins(resultsIdx) {
    return Object.values(resultsIdx).reduce(function (partyToWins, result) {
      const winningPartyID = result.partyToVotes.winningPartyID;
      if (!partyToWins[winningPartyID]) {
        partyToWins[winningPartyID] = 0;
      }
      partyToWins[winningPartyID]++;
      return partyToWins;
    }, {});
  }
}

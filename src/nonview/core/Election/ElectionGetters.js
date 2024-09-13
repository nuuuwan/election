import { EntType, ProvinceUtils } from "../../base";
import Result from "../Result";

const ElectionStats = {
  getPartyIDList(min_p = 0.01) {
    // Returns the list of party IDs, where the party has won at least MIN_P votes in the election.
    const resultList = this.pdResultList;
    const aggrResults = Result.fromList("aggr", resultList);
    const partyToPVotesSorted = aggrResults.partyToVotes.partyToPVotesSorted;
    return Object.entries(partyToPVotesSorted)
      .filter(function ([partyID, pVotes]) {
        return pVotes >= min_p;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  },

  getPartyToWins() {
    return Object.values(this.resultIdx).reduce(function (partyToWins, result) {
      const winningPartyID = result.partyToVotes.winningPartyID;
      if (!partyToWins[winningPartyID]) {
        partyToWins[winningPartyID] = 0;
      }
      partyToWins[winningPartyID]++;
      return partyToWins;
    }, {});
  },

  getParentID(entID, pdEnt) {
    const entType = EntType.fromID(entID);
    switch (entType) {
      case EntType.PD:
        return pdEnt.d.ed_id;
      case EntType.ED:
        return pdEnt.d.ed_id;
      case EntType.PROVINCE:
        // HACK! To fix bug in postal data
        const provinceID1 = pdEnt.d.province_id;
        if (provinceID1 && provinceID1 !== "None") {
          return provinceID1;
        }
        return ProvinceUtils.getProvinceIDForEDID(pdEnt.d.ed_id);

      default:
        return "LK";
    }
  },

  getReleaseStats(entID, pdIdx) {
    let nResultsTotal = 0;
    let nResultsReleased = 0;

    for (let [id, ent] of Object.entries(pdIdx)) {
      const parentID = this.getParentID(entID, ent);
      if (parentID === entID) {
        nResultsTotal++;
        if (this.resultIdx[id]) {
          nResultsReleased++;
        }
      }
    }
    return { nResultsTotal, nResultsReleased };
  },

  isComplete(entID, pdIdx) {
    const { nResultsTotal, nResultsReleased } = this.getReleaseStats(
      entID,
      pdIdx
    );
    return nResultsReleased === nResultsTotal;
  },
};

export default ElectionStats;

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

  getReleaseStats(entID, pdIdx) {
    const entType = EntType.fromID(entID);

    let nResultsTotal = 0;
    let nResultsReleased = 0;
  
    for (let [id, ent] of Object.entries(pdIdx)) {
      let parentID;
      if (entType === EntType.PD) {
        parentID = ent.d.pd_id;
      } else if (entType === EntType.ED) {
        parentID = ent.d.ed_id;
      } else if (entType === EntType.PROVINCE) {
        parentID = ent.d.province_id;
        // HACK! To fix bug in postal data
        if (parentID === "None") {
          parentID = ProvinceUtils.getProvinceIDForEDID(ent.d.ed_id);
        }
      } else {
        parentID = "LK";
      }
  
      if (parentID === entID) {
        nResultsTotal++;
        if (this.resultIdx[id]) {
          nResultsReleased++;
        }
      }

     
    } return { nResultsTotal, nResultsReleased };
  },

  isComplete(entID, pdIdx) {
    const { nResultsTotal, nResultsReleased } = this.getReleaseStats(entID, pdIdx);
    return nResultsReleased === nResultsTotal;
  }

};

export default ElectionStats;

import { EntType, ProvinceUtils } from "../../base";
import { PD_ID_TO_GROUP_ID } from "../../constants";

const ElectionStats = {
  getPartyIDList(min_p = 0.01) {
    // Returns the list of party IDs, where the party has won at least MIN_P votes in the election.
    const partyToPVotesSorted = this.resultLK.partyToVotes.partyToPVotesSorted;
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
        return ProvinceUtils.getProvinceIDForPDEnt(pdEnt);
      case EntType.EZ:
        return PD_ID_TO_GROUP_ID[pdEnt.id];
      default:
        return "LK";
    }
  },

  // Releases

  getReleaseStats(entID, entIdx, electionPrevious) {
    let nResultsTotal = 0;
    let nResultsReleased = 0;

    let electors = 0;
    let electorsReleased = 0;

    for (let [id, ent] of Object.entries(entIdx)) {
      const parentID = this.getParentID(entID, ent);

      if (parentID === entID) {
        nResultsTotal++;
        const result = this.resultIdx[id];
        if (result) {
          nResultsReleased++;
          const electorsResult = result.summary.electors;
          electors += electorsResult;
          electorsReleased += electorsResult;
        } else {
          if (electionPrevious) {
            electors += electionPrevious.resultIdx[id].summary.electors;
          }
        }
      }
    }
    const pElectors = electorsReleased / Math.max(1, electors);
    return { nResultsTotal, nResultsReleased, pElectors };
  },

  isComplete(entID, pdIdx, electionPrevious) {
    const { nResultsTotal, nResultsReleased } = this.getReleaseStats(
      entID,
      pdIdx,
      electionPrevious
    );
    return nResultsReleased === nResultsTotal;
  },

  // Ent 
  getEntIdx(data) {
    switch (this.baseEntType) {
      case EntType.PD:
        return data.pdIdx;
      case EntType.ED:
        return data.edIdx;
     default:
        throw new Error("Unknown baseEntType: " + this.baseEntType);
    }
  }
};

export default ElectionStats;

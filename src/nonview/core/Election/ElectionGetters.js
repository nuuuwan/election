import {
  EntType,
  ProvinceUtils,
  PD_ID_TO_GROUP_ID,
  ED_ID_TO_GROUP_ID,
} from "../..";

const ElectionStats = {
  getPartyIDList(min_p = 0.01) {
    // Returns the list of party IDs, where the party has won at least MIN_P votes in the election.
    const partyToPVotesSorted = this.resultLK.partyToVotes.partyToPVotesSorted;
    return Object.entries(partyToPVotesSorted)
      .filter(function (entry) {
        return entry[1] >= min_p;
      })
      .map(function (entry) {
        return entry[0];
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

  getParentID(entID, baseEnt) {
    const entType = EntType.fromID(entID);

    switch (entType) {
    case EntType.PD:
      return baseEnt.d.ed_id;
    case EntType.ED:
      return baseEnt.d.ed_id;
    case EntType.PROVINCE:
      return ProvinceUtils.getProvinceIDForPDEnt(baseEnt);
    case EntType.EZ:
      return PD_ID_TO_GROUP_ID[baseEnt.id] || ED_ID_TO_GROUP_ID[baseEnt.id];
    default:
      return "LK";
    }
  },

  // Releases

  getNResultsReleasedAndTotal(entID, entIdx) {
    let nResultsTotal = 0;
    let nResultsReleased = 0;

    for (const [id, ent] of Object.entries(entIdx)) {
      const parentID = this.getParentID(entID, ent);

      if (parentID === entID) {
        nResultsTotal++;
        const result = this.resultIdx[id];
        if (result) {
          nResultsReleased++;
        }
      }
    }

    return { nResultsTotal, nResultsReleased };
  },

  getPElectors(entID, entIdx, electionPrevious) {
    let electors = 0;
    let electorsReleased = 0;

    for (const [id, ent] of Object.entries(entIdx)) {
      const parentID = this.getParentID(entID, ent);

      if (parentID === entID) {
        const result = this.resultIdx[id];
        if (result) {
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
    return electorsReleased / Math.max(1, electors);
  },

  isComplete(entID, entIdx) {
    const { nResultsTotal, nResultsReleased } =
      this.getNResultsReleasedAndTotal(entID, entIdx);
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
  },
};

export default ElectionStats;

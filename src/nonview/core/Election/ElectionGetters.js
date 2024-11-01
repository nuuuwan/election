import {
  EntType,
  PD_ID_TO_GROUP_ID,
  ED_ID_TO_GROUP_ID,
  DictX,
  PartyToVotes,
  Party,
} from '../..';

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
    return (
      {
        [EntType.PD.name]: baseEnt.d.ed_id,
        [EntType.ED.name]: baseEnt.d.ed_id,
        [EntType.PROVINCE.name]: baseEnt.d.province_id,
        [EntType.EZ.name]:
          PD_ID_TO_GROUP_ID[baseEnt.id] || ED_ID_TO_GROUP_ID[baseEnt.id],
      }[entType.name] || 'LK'
    );
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
    const entIdx = {
      [EntType.PD.name]: data.pdIdx,
      [EntType.ED.name]: data.edIdx,
    }[this.baseEntType.name];

    if (!entIdx) {
      throw new Error('Unknown baseEntType: ' + this.baseEntType);
    }

    return entIdx;
  },

  getLKPartyToVotesErrorInfo() {
    const unsorted = this.baseResultList.reduce(
      function (idx, result) {
        const partyToVotesErrorInfo = result.partyToVotes.partyToVoteErrorInfo;

        return Object.entries(partyToVotesErrorInfo).reduce(
          function (idx, [partyID, { votesMin, votesMax }]) {
            if (!idx[partyID]) {
              idx[partyID] = { votesMin: 0, votesMax: 0 };
            }
            idx[partyID].votesMin += votesMin;
            idx[partyID].votesMax += votesMax;
            return idx;
          }.bind(this),
          idx,
        );
      }.bind(this),
      {},
    );
    const totalVotes = this.summary.valid;
    const votesLimit = totalVotes * PartyToVotes.MIN_P_VOTES;
    const filtered = DictX.filter(
      unsorted,
      (a) => a[1].votesMin >= votesLimit && !Party.fromID(a[0]).isNonParty,
    );

    return DictX.sort(filtered, (a) => -a[1].votesMin);
  },
};

export default ElectionStats;

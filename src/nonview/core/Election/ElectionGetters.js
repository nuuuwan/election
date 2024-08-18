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
};

export default ElectionStats;

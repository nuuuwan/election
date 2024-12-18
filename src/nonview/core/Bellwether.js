export default class Bellwether {
  static getStatsForElection(election, entID) {
  
    let resultEnt = null;
    try {
      resultEnt = election.getResult(entID);
    } catch (error) {
      resultEnt = null;
    }
    
    if (!resultEnt) {
      return {
        isSameWinner: false,
        error: 0,
      };
    }
    const resultLK = election.resultLK;

    const isSameWinner =
      resultEnt.partyToVotes.winningPartyID ===
      resultLK.partyToVotes.winningPartyID;
    const error = Object.entries(
      resultLK.partyToVotes.partyToPVotesSorted
    ).reduce(function (error, [partyID, pVotesLK]) {
      const pVotesEnt = resultEnt.partyToVotes.partyToPVotesSorted[partyID];
      const diff = Math.abs(pVotesLK - pVotesEnt);
      return error + diff * pVotesLK;
    }, 0);
    return {
      isSameWinner: isSameWinner,
      error: error,
    };
  }

  static getStats(electionHistory, entID) {
    const previousElectionsOfSameType = electionHistory.previousElectionList;

    const n = previousElectionsOfSameType.length;
    const { nSame, error } = previousElectionsOfSameType.reduce(
      function ({ nSame, error }, election) {
        const { isSameWinner, error: errorElection } =
          Bellwether.getStatsForElection(election, entID);
        return {
          nSame: nSame + (isSameWinner ? 1 : 0),
          error: error + errorElection / n,
        };
      },
      { nSame: 0, error: 0 }
    );
    return { entID, n, nSame, pSame: nSame / n, error };
  }

  static getBestBellwetherInfoList(electionHistory, election, pdIdx) {
    return election.resultList
      .filter(function (result) {
        return election.isComplete(result.entID, pdIdx);
      })
      .map(function (result) {
        return Bellwether.getStats(electionHistory, result.entID);
      })
      .sort(function (a, b) {
        return a.error - b.error;
      });
  }
}

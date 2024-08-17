import Election from "./Election";

export default class Bellwether {
  static getStatsForElection(election, entID) {
    const resultEnt = election.resultsIdx[entID];
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
  static getStats(elections, electionDisplay) {
    const entID = electionDisplay.finalPDID;
    const previousElectionsOfSameType = Election.getPreviousElectionsOfSameType(
      elections,
      electionDisplay
    );

    const n = previousElectionsOfSameType.length;
    return previousElectionsOfSameType.reduce(
      function ({ n, nSame, error }, election) {
        const { isSameWinner, error: errorElection } =
          Bellwether.getStatsForElection(election, entID);
        return {
          n: n,
          nSame: nSame + (isSameWinner ? 1 : 0),
          error: error + errorElection / n,
        };
      },
      { n, nSame: 0, error: 0 }
    );
  }
}

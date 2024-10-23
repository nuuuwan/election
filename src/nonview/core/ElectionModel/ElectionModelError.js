export default class ElectionModelError {
  constructor(actualElection, projectedElection) {
    this.actualElection = actualElection;
    this.projectedElection = projectedElection;
  }

  getResultErrorInfo(entID) {
    const resultActual = this.actualElection.getResult(entID);
    const resultProjected = this.projectedElection.getResult(entID);

    const winningPartyIDActual = resultActual.winningPartyID;
    const winningPartyIDProjected = resultProjected.winningPartyID;

    const meanL1Error = Object.entries(
      resultActual.partyToVotes.partyToPVotes,
    ).reduce(function (meanL1Error, [partyID, pVotesActual]) {
      const pVotesProjected =
        resultProjected.partyToVotes.partyToPVotes[partyID] || 0;

      const error = pVotesActual * Math.abs(pVotesActual - pVotesProjected);

      return meanL1Error + error;
    }, 0);
    return {
      winnerCorrect: winningPartyIDProjected === winningPartyIDActual,
      meanL1Error,
    };
  }

  getSummaryStats(entIDList) {
    const errorInfoList = entIDList.map((entID) =>
      this.getResultErrorInfo(entID),
    );

    const nWinnerCorrect = errorInfoList.filter(
      (errorInfo) => errorInfo.winnerCorrect,
    ).length;

    const meanL1ErrorList = errorInfoList
      .map((errorInfo) => errorInfo.meanL1Error)
      .sort();
    const meanL1ErrorMedian =
      meanL1ErrorList[Math.floor(meanL1ErrorList.length / 2)];

    const meanL1Error90pctl =
      meanL1ErrorList[Math.floor(meanL1ErrorList.length * 0.9)];

    return {
      n: entIDList.length,
      nWinnerCorrect,
      meanL1ErrorMedian,
      meanL1Error90pctl,
    };
  }
}

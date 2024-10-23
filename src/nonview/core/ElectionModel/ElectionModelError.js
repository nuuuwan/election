import ArrayX from '../../base/ArrayX';

import Statistics from '../../base/Statistics';

export default class ElectionModelError {
  static MIN_P_FOR_ESTIMATE = 0.01;

  constructor(actualElection, projectedElection) {
    this.actualElection = actualElection;
    this.projectedElection = projectedElection;
  }

  static getErrorInfoList(resultActual, resultProjected) {
    return Object.entries(resultActual.partyToVotes.partyToPVotes)
      .map(function ([partyID, pVotesActual]) {
        const pVotesProjected =
          resultProjected.partyToVotes.partyToPVotes[partyID] || 0;
        const error = Math.abs(pVotesActual - pVotesProjected);

        return {
          partyID,
          pVotesActual,
          pVotesProjected,
          error,
        };
      })
      .filter(
        ({ pVotesActual }) =>
          pVotesActual > ElectionModelError.MIN_P_FOR_ESTIMATE,
      );
  }

  static getMeanL1Error(errorInfoList) {
    return errorInfoList.reduce(function (
      meanL1Error,
      { error, pVotesActual },
    ) {
      return meanL1Error + error * pVotesActual;
    },
    0);
  }

  getResultErrorInfo(entID) {
    const resultActual = this.actualElection.getResult(entID);
    const resultProjected = this.projectedElection.getResult(entID);

    const winningPartyIDActual = resultActual.winningPartyID;
    const winningPartyIDProjected = resultProjected.winningPartyID;

    const errorInfoList = ElectionModelError.getErrorInfoList(
      resultActual,
      resultProjected,
    );

    const meanL1Error = ElectionModelError.getMeanL1Error(errorInfoList);

    return {
      winnerCorrect: winningPartyIDProjected === winningPartyIDActual,
      errorInfoList,
      nEstimates: errorInfoList.length,
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

    const errorList = ArrayX.flatten(
      errorInfoList.map((errorInfo) =>
        errorInfo.errorInfoList.map((errorInfo) => errorInfo.error),
      ),
    );

    const sortedAllErrorInfoList = errorList.sort();
    const meanL1ErrorMedian = Statistics.median(sortedAllErrorInfoList);
    const meanL1Error90pctl = Statistics.percentile(
      sortedAllErrorInfoList,
      0.9,
    );

    return {
      n: entIDList.length,
      nWinnerCorrect,
      nEstimates: sortedAllErrorInfoList.length,
      meanL1ErrorMedian,
      meanL1Error90pctl,
    };
  }

  static getNonReleasedPDIDList({ electionProjected, electionDisplay }) {
    const releasedPDIDList = electionDisplay.baseEntIDList;
    const notReleasedPDIDList = electionProjected.baseEntIDList.filter(
      (pdID) => !releasedPDIDList.includes(pdID),
    );
    return notReleasedPDIDList;
  }
}

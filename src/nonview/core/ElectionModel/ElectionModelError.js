import ArrayX from '../../base/ArrayX';
import MathX from '../../base/MathX';
import Statistics from '../../base/Statistics';
import Party from '../Party';
import PartyToVotes from '../PartyToVotes';
import Result from '../Result';

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

  static rebuildPartyToVotes(partyToVotes, meanL1Error90pctl) {
    const totalVotes = partyToVotes.totalVotes;
    const kError = MathX.forceRange(1 - meanL1Error90pctl, 0, 1);

    let partyToVotesRebuilt = Object.fromEntries(
      Object.entries(partyToVotes.partyToVotes).map(function ([
        partyID,
        votes,
      ]) {
        const pVotes = votes / totalVotes;
        const pVotesMin = MathX.forceRange(pVotes * kError, 0, 1);
        const votesMin = Math.floor(pVotesMin * totalVotes);
        return [partyID, votesMin];
      }),
    );
    const totalVotesMin = MathX.sum(Object.values(partyToVotesRebuilt));
    const errorVotes = totalVotes - totalVotesMin;
    partyToVotesRebuilt[Party.ERROR.id] = errorVotes;

    return new PartyToVotes(partyToVotesRebuilt);
  }

  static rebuildResult(result, meanL1Error90pctl) {
    return new Result(
      result.entID,
      result.summary,
      ElectionModelError.rebuildPartyToVotes(
        result.partyToVotes,
        meanL1Error90pctl,
      ),
      result.resultTime,
    );
  }

  static rebuildResultList(
    electionProjected,
    meanL1Error90pctl,
    nonReleasedPDIDList,
  ) {
    return electionProjected.baseResultList.map(function (result) {
      if (!nonReleasedPDIDList.includes(result.entID)) {
        return result;
      }
      return ElectionModelError.rebuildResult(result, meanL1Error90pctl);
    });
  }

  static getElectionProjectedWithError(
    electionDisplay,
    electionProjected,
    electionPrevious,
    electionProjectedPrevious,
  ) {
    const electionModelError = new ElectionModelError(
      electionPrevious,
      electionProjectedPrevious,
    );

    const nonReleasedPDIDList = ElectionModelError.getNonReleasedPDIDList({
      electionProjected,
      electionDisplay,
    });

    const { meanL1Error90pctl } =
      electionModelError.getSummaryStats(nonReleasedPDIDList);

    const election = electionProjected.copy();

    const baseResultList = ElectionModelError.rebuildResultList(
      electionProjected,
      meanL1Error90pctl,
      nonReleasedPDIDList,
    );
    election.build(baseResultList);
    return election;
  }
}

import MathX from '../../base/MathX';
import Party from '../Party';
import PartyToVotes from '../PartyToVotes';
import Result from '../Result';

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

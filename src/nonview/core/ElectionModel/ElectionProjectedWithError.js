import { ElectionModelError, Party, PartyToVotes, Result } from '../..';
import MathX from '../../base/MathX';

export default class ElectionProjectedWithError {
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
      ElectionProjectedWithError.rebuildPartyToVotes(
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
      return ElectionProjectedWithError.rebuildResult(
        result,
        meanL1Error90pctl,
      );
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

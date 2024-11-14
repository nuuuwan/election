import { ElectionModelError, Party, PartyToVotes, Result } from '../..';
import MathX from '../../base/MathX';

export default class ElectionProjectedWithError {
  static MIN_ED_P_ELECTORS = 0.1;
  static rebuildPartyToVotes(partyToVotes, meanL1Error90pctl, edPartyToPVotes) {
    const totalVotes = partyToVotes.totalVotes;
    const kError = MathX.forceRange(1 - meanL1Error90pctl, 0, 1);
    let partyToVotesRebuilt = Object.fromEntries(
      Object.entries(partyToVotes.partyToVotes).map(function ([
        partyID,
        votes,
      ]) {
        if (
          !edPartyToPVotes ||
          !edPartyToPVotes[partyID] ||
          edPartyToPVotes[partyID] < 0.05
        ) {
          return [partyID, 0];
        }

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

  static rebuildResult(
    result,
    meanL1Error90pctl,
    edPElectors,
    edPartyToPVotes,
  ) {
    return new Result(
      result.entID,
      result.summary,
      ElectionProjectedWithError.rebuildPartyToVotes(
        result.partyToVotes,
        meanL1Error90pctl,
        edPElectors,
        edPartyToPVotes,
      ),
      result.resultTime,
    );
  }

  static rebuildResultList({
    electionProjected,
    meanL1Error90pctl,
    nonReleasedPDIDList,

    edToPartyToPVotes,
  }) {
    return electionProjected.baseResultList.map(function (result) {
      if (!nonReleasedPDIDList.includes(result.entID)) {
        return result;
      }
      const edID = result.entID.substring(0, 5);

      const edPartyToPVotes = edToPartyToPVotes[edID];
      return ElectionProjectedWithError.rebuildResult(
        result,
        meanL1Error90pctl,

        edPartyToPVotes,
      );
    });
  }

  static getEDToPartyToPVotes(electionDisplay) {
    return Object.fromEntries(
      electionDisplay.edResultList.map(function (edResult) {
        return [edResult.entID, edResult.partyToVotes.partyToPVotes];
      }),
    );
  }

  static getElectionProjectedWithError({
    electionDisplay,
    electionProjected,
    electionPrevious,
    electionProjectedPrevious,
  }) {
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

    const edToPartyToPVotes =
      ElectionProjectedWithError.getEDToPartyToPVotes(electionDisplay);

    const election = electionProjected.copy();
    const baseResultList = ElectionProjectedWithError.rebuildResultList({
      electionProjected,
      meanL1Error90pctl,
      nonReleasedPDIDList,

      edToPartyToPVotes,
    });
    election.build(baseResultList);
    return election;
  }
}

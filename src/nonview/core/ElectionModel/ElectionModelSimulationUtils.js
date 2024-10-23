import { MathX, PartyToVotes, Party, Summary, Result } from '../..';

export default class ElectionModelSimulationUtils {
  static simulateSummary(entID, lastElectionOfSameType) {
    const summaryLast = lastElectionOfSameType.getResult(entID).summary;
    const summaryLastSameType = lastElectionOfSameType.getResult(entID).summary;
    const { electors, polled } = summaryLast;
    const rejected = Math.round(polled * summaryLastSameType.pRejected);
    const valid = polled - rejected;
    return new Summary(valid, rejected, polled, electors);
  }

  static simulatePartyToVotes(summary, partyToPVotes) {
    const valid = summary.valid;

    const partyToVotes = Object.entries(partyToPVotes).reduce(
      function (partyToVotes, [partyID, pVotes]) {
        pVotes = MathX.forceRange(pVotes, 0, 1);
        const votes = Math.round(pVotes * valid);
        partyToVotes[partyID] = votes;
        return partyToVotes;
      },
      { [Party.ERROR.id]: 0 },
    );
    return new PartyToVotes(partyToVotes);
  }

  static simulateResult(lastElectionOfSameType, entID, partyToPVotes) {
    const summary = ElectionModelSimulationUtils.simulateSummary(
      entID,
      lastElectionOfSameType,
    );
    const partyToVotes = ElectionModelSimulationUtils.simulatePartyToVotes(
      summary,
      partyToPVotes,
    );
    return new Result(entID, summary, partyToVotes, '');
  }

  static simulateNonReleasedResultList(
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
  ) {
    const lastElectionOfSameType = electionHistory.electionPrevious;
    return nonReleasedEntIDList.map(function (entID) {
      return ElectionModelSimulationUtils.simulateResult(
        lastElectionOfSameType,
        entID,
        pdToPartyToPVotes[entID],
      );
    });
  }

  static simulateResultList(
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
  ) {
    const nonReleasedResultList =
      ElectionModelSimulationUtils.simulateNonReleasedResultList(
        electionHistory,
        nonReleasedEntIDList,
        pdToPartyToPVotes,
      );
    return [
      ...electionHistory.electionCurrent.pdResultList,
      ...nonReleasedResultList,
    ];
  }
}

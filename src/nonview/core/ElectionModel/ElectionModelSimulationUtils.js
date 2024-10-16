import { MathX, PartyToVotes, Party, Summary, Result } from "../..";

export default class ElectionModelSimulationUtils {
  static simulateSummary(entID, lastElectionOfSameType) {
    const summaryLast = lastElectionOfSameType.getResult(entID).summary;
    const summaryLastSameType = lastElectionOfSameType.getResult(entID).summary;
    const { electors, polled } = summaryLast;
    const rejected = Math.round(polled * summaryLastSameType.pRejected);
    const valid = polled - rejected;
    return new Summary(valid, rejected, polled, electors);
  }

  static simulatePartyToVotes(summary, partyToPVotes, pError) {
    const valid = summary.valid;
    const kError = Math.max(0, 1 - pError);
    const partyToVotes = Object.entries(partyToPVotes).reduce(
      function (partyToVotes, [partyID, pVotes]) {
        pVotes = MathX.forceRange(pVotes, 0, 1);
        const votes = Math.round(pVotes * valid);
        const votesMin = Math.round(pVotes * kError * valid);
        partyToVotes[partyID] = votesMin;
        partyToVotes[Party.ERROR.id] += votes - votesMin;
        return partyToVotes;
      },
      { [Party.ERROR.id]: 0 }
    );
    return new PartyToVotes(partyToVotes);
  }

  static simulateResult(
    lastElectionOfSameType,
    entID,
    partyToPVotes,
    pError
  ) {
    const summary = ElectionModelSimulationUtils.simulateSummary(
      entID,
      lastElectionOfSameType
    );
    const partyToVotes = ElectionModelSimulationUtils.simulatePartyToVotes(
      summary,
      partyToPVotes,
      pError
    );
    return new Result(entID, summary, partyToVotes, "");
  }

  static simulateNonReleasedResultList(
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {

    const lastElectionOfSameType = electionHistory.electionPrevious;
    return nonReleasedEntIDList.map(function (entID) {
      return ElectionModelSimulationUtils.simulateResult(
        lastElectionOfSameType,
        entID,
        pdToPartyToPVotes[entID],
        pError
      );
    });
  }

  static simulateResultList(
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {
    const nonReleasedResultList =
      ElectionModelSimulationUtils.simulateNonReleasedResultList(
        electionHistory,
        nonReleasedEntIDList,
        pdToPartyToPVotes,
        pError
      );
    return [...electionHistory.electionCurrent.pdResultList, ...nonReleasedResultList];
  }
}

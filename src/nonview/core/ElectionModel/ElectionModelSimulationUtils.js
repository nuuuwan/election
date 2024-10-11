import { MathX } from "../..";
import { PartyToVotes, Party, Summary, Result } from "../../../nonview";

export default class ElectionModelSimulationUtils {
  static simulateSummary(entID, lastElection, lastElectionOfSameType) {
    const resultLastSameType = lastElectionOfSameType.getResult(entID);
    if (!resultLastSameType) {
      return null;
    }
    const resultLast = lastElection.getResult(entID);
    const summaryLast = resultLast.summary;
    const summaryLastSameType = resultLastSameType.summary;

    const electors = summaryLast.electors;
    const polled = summaryLast.polled;
    const rejected = Math.round(
      summaryLast.polled * summaryLastSameType.pRejected
    );
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
    lastElection,
    lastElectionOfSameType,
    entID,
    partyToPVotes,
    pError
  ) {
    if (!lastElection) {
      return null;
    }

    const summary = ElectionModelSimulationUtils.simulateSummary(
      entID,
      lastElection,
      lastElectionOfSameType
    );
    if (!summary) {
      return null;
    }

    const partyToVotes = ElectionModelSimulationUtils.simulatePartyToVotes(
      summary,
      partyToPVotes,
      pError
    );

    return new Result(entID, summary, partyToVotes, "");
  }

  static simulateNonReleasedResultList(
    currentElection,
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {
    const lastElection = electionHistory.getPreviousElection(currentElection);
    const lastElectionOfSameType =
      electionHistory.getPreviousElectionOfSameType(currentElection);

    return nonReleasedEntIDList.map(function (entID) {
      return ElectionModelSimulationUtils.simulateResult(
        lastElection,
        lastElectionOfSameType,
        entID,
        pdToPartyToPVotes[entID],
        pError
      );
    });
  }

  static simulateResultList(
    currentElection,
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {
    const releasedResultList = currentElection.pdResultList;
    const nonReleasedResultList =
      ElectionModelSimulationUtils.simulateNonReleasedResultList(
        currentElection,
        electionHistory,
        nonReleasedEntIDList,
        pdToPartyToPVotes,
        pError
      );

    return [...releasedResultList, ...nonReleasedResultList];
  }
}

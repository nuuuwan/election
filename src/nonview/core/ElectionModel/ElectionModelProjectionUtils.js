import { MathX } from "../..";
import { PartyToVotes, Party, Summary, Result } from "../../../nonview";
import ElectionModelNormalizeUtils from "./ElectionModelNormalizeUtils";

export default class ElectionModelProjectionUtils {
  static getProjection(
    model,
    currentElection,
    XEvaluate,
    nonReleasedEntIDList
  ) {
    let YHat = [];
    if (model) {
      YHat = XEvaluate.map((Xi) => model.predict(Xi));
    }
    const partyIDList = currentElection.getPartyIDList();
    const entToPartyToPVotes = YHat.reduce(function (
      entToPartyToPVotes,
      Yi,
      i
    ) {
      const partyID = partyIDList[i];
      return Yi.reduce(function (entToPartyToPVotes, pVotes, j) {
        const entID = nonReleasedEntIDList[j];
        if (!entToPartyToPVotes[entID]) {
          entToPartyToPVotes[entID] = {};
        }
        entToPartyToPVotes[entID][partyID] = pVotes;
        return entToPartyToPVotes;
      }, entToPartyToPVotes);
    },
    {});
    const normEntToPartyToPVotes =
      ElectionModelNormalizeUtils.normalize(entToPartyToPVotes);
    return normEntToPartyToPVotes;
  }

  static getSimulatedSummary(entID, lastElection, lastElectionOfSameType) {
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

  static getSimulatedPartyToVotes(
    entID,
    summary,
    normEntToPartyToPVotes,
    pError
  ) {
    const valid = summary.valid;
    const partyToPVotes = normEntToPartyToPVotes[entID];
    const partyToVotes = Object.entries(partyToPVotes).reduce(
      function (partyToVotes, [partyID, pVotes]) {
        pVotes = MathX.forceRange(pVotes, 0, 1);
        const votes = Math.round(pVotes * valid);

        const kError = Math.max(0, 1 - pError);
        const votesMin = Math.round(pVotes * kError * valid);

        partyToVotes[partyID] = votesMin;
        partyToVotes[Party.ERROR.id] += votes - votesMin;
        return partyToVotes;
      },
      { [Party.ERROR.id]: 0 }
    );
    return new PartyToVotes(partyToVotes);
  }

  static getSimulatedResult(
    lastElection,
    lastElectionOfSameType,
    entID,
    normEntToPartyToPVotes,
    pError
  ) {
    if (!lastElection) {
      return null;
    }

    const summary = ElectionModelProjectionUtils.getSimulatedSummary(
      entID,
      lastElection,
      lastElectionOfSameType
    );
    if (!summary) {
      return null;
    }

    const partyToVotes = ElectionModelProjectionUtils.getSimulatedPartyToVotes(
      entID,
      summary,
      normEntToPartyToPVotes,
      pError
    );

    return new Result(entID, summary, partyToVotes, "");
  }
}

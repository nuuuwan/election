import { MathX } from "../../base";
import { PartyToVotes, Party, Summary, Result } from "../../../nonview/core";
import ElectionModelNormalizeUtils from "./ElectionModelNormalizeUtils";

export default class ElectionModelProjectionUtils {
  static getProjection(model, currentElection, XEvaluate, nonReleasedPDIDList) {
    let YHat = [];
    if (model) {
      YHat = XEvaluate.map((Xi) => model.predict(Xi));
    }
    const partyIDList = currentElection.getPartyIDList();
    const pdToPartyToPVotes = YHat.reduce(function (pdToPartyToPVotes, Yi, i) {
      const partyID = partyIDList[i];
      return Yi.reduce(function (pdToPartyToPVotes, pVotes, j) {
        const pdID = nonReleasedPDIDList[j];
        if (!pdToPartyToPVotes[pdID]) {
          pdToPartyToPVotes[pdID] = {};
        }
        pdToPartyToPVotes[pdID][partyID] = pVotes;
        return pdToPartyToPVotes;
      }, pdToPartyToPVotes);
    }, {});
    const normPDToPartyToPVotes =
      ElectionModelNormalizeUtils.normalize(pdToPartyToPVotes);
    return normPDToPartyToPVotes;
  }

  static getSimulatedSummary(pdID, lastElection, lastElectionOfSameType) {
    const resultLastSameType = lastElectionOfSameType.getResult(pdID);
    if (!resultLastSameType) {
      return null;
    }
    const resultLast = lastElection.getResult(pdID);
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
    pdID,
    summary,
    normPDToPartyToPVotes,
    pError
  ) {
    const valid = summary.valid;
    const partyToPVotes = normPDToPartyToPVotes[pdID];
    const partyToVotes = Object.entries(partyToPVotes).reduce(
      function (partyToVotes, [partyID, pVotes]) {
        pVotes = MathX.forceRange(pVotes, 0, 1);
        const votes = Math.round(pVotes * valid);

        const kError = Math.max(0, 1 - pError);
        const votesMin = Math.round(pVotes * kError * valid);
        partyToVotes[partyID] = votesMin;
        partyToVotes[Party.UNCERTAIN.id] += votes - votesMin;
        return partyToVotes;
      },
      { [Party.UNCERTAIN.id]: 0 }
    );
    return new PartyToVotes(partyToVotes);
  }

  static getSimulatedResult(
    lastElection,
    lastElectionOfSameType,
    pdID,
    normPDToPartyToPVotes,
    pError
  ) {
    if (!lastElection) {
      return null;
    }

    const summary = ElectionModelProjectionUtils.getSimulatedSummary(
      pdID,
      lastElection,
      lastElectionOfSameType
    );
    if (!summary) {
      return null;
    }

    const partyToVotes = ElectionModelProjectionUtils.getSimulatedPartyToVotes(
      pdID,
      summary,
      normPDToPartyToPVotes,
      pError
    );

    return new Result(pdID, summary, partyToVotes);
  }
}

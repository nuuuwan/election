import { ElectionModel } from "../../nonview/core";
import { ArrayX } from "../base";

export default class DerivedData {
  static getActiveEntID(activeEntID, nResultsDisplay, election) {
    if (activeEntID) {
      const iResult = election.pdIDList.indexOf(activeEntID);
      if (iResult > -1) {
        if (!nResultsDisplay || iResult < nResultsDisplay) {
          return activeEntID;
        }
      }
    }

    if (nResultsDisplay) {
      return election.resultList[nResultsDisplay - 1].entID;
    }
    return ArrayX.last(election.resultList).entID;
  }

  static getNResultsDisplay(nResultsDisplay, election) {
    if (
      (nResultsDisplay || nResultsDisplay === 0) &&
      nResultsDisplay >= 0 &&
      nResultsDisplay < election.pdResultList.length
    ) {
      return nResultsDisplay;
    }
    return election.resultList.length;
  }

  static getPredictedElection(election, electionDisplay, pdIdx, elections) {
    const releasedPDIDList = electionDisplay.pdIDList;
    const nonReleasedPDIDList = Object.keys(pdIdx).filter(
      (pdID) => !releasedPDIDList.includes(pdID)
    );

    const electionModel = new ElectionModel(
      elections,
      election,
      releasedPDIDList,
      nonReleasedPDIDList
    );
    const electionProjected = electionModel.getElectionNotReleasedPrediction();
    return electionProjected;
  }

  static getDerived(nResultsDisplay, election, pdIdx, elections) {
    const electionDisplay = election.getElectionSubset(nResultsDisplay);

    let electionProjected;
    if (nResultsDisplay > 0) {
      electionProjected = DerivedData.getPredictedElection(
        election,
        electionDisplay,
        pdIdx,
        elections
      );
    }
    return { electionDisplay, electionProjected };
  }
}

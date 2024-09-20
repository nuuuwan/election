import { ElectionModel } from "../../nonview/core";
import { ArrayX } from "../base";

export default class DerivedData {
  static isValidNResultsDisplay(nResultsDisplay, election) {
    return (
      (nResultsDisplay || nResultsDisplay === 0) &&
      nResultsDisplay >= 0 &&
      nResultsDisplay <= election.baseResultList.length
    );
  }

  static getActiveEntID(activeEntID, nResultsDisplay, election) {
    if (activeEntID) {
      const iResult = election.baseEntIDList.indexOf(activeEntID);
      if (iResult > -1) {
        if (!nResultsDisplay || iResult < nResultsDisplay) {
          return activeEntID;
        }
      }
    }
    if (DerivedData.isValidNResultsDisplay(nResultsDisplay, election)) {
      return election.baseResultList[nResultsDisplay - 1].entID;
    }
    return ArrayX.last(election.baseResultList).entID;
  }

  static getNResultsDisplay(nResultsDisplay, election) {
    if (DerivedData.isValidNResultsDisplay(nResultsDisplay, election)) {
      return nResultsDisplay;
    }
    return election.baseResultList.length;
  }

  static getPredictedElection(election, electionDisplay, entIdx, elections) {
    const releasedEntIDList = electionDisplay.baseEntIDList;
    const nonReleasedEntIDList = Object.keys(entIdx).filter(
      (entID) => !releasedEntIDList.includes(entID)
    );

    const electionModel = new ElectionModel(
      elections,
      election,
      releasedEntIDList,
      nonReleasedEntIDList
    );
    const electionProjected = electionModel.getElectionNotReleasedPrediction();
    return electionProjected;
  }

  static getDerived(nResultsDisplay, election, entIdx, elections) {
    const electionDisplay = election.getElectionSubset(nResultsDisplay);

    let electionProjected;
    if (nResultsDisplay > 0) {
      electionProjected = DerivedData.getPredictedElection(
        election,
        electionDisplay,
        entIdx,
        elections
      );
    }
    return { electionDisplay, electionProjected };
  }
}

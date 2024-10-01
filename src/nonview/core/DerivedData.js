import { ElectionModel } from "../../nonview";
import { ArrayX } from "..";

export default class DerivedData {
  static isValidNResultsDisplay(nResultsDisplay, election) {
    return (
      (nResultsDisplay || nResultsDisplay === 0) &&
      nResultsDisplay >= 0 &&
      nResultsDisplay <= election.baseResultList.length
    );
  }

  static checkIfResultDisplayable(election, activeEntID, nResultsDisplay) {
    if (!activeEntID) {
      return false;
    }
    const iResult = election.baseEntIDList.indexOf(activeEntID);
    if (iResult === -1) {
      return false;
    }

    if (nResultsDisplay && iResult >= nResultsDisplay) {
      return false;
    }

    return true;
  }

  static getActiveEntID(activeEntID, nResultsDisplay, election) {
    if (!election.isLoaded) {
      return null;
    }

    if (
      DerivedData.checkIfResultDisplayable(
        election,
        activeEntID,
        nResultsDisplay
      )
    ) {
      return activeEntID;
    }

    if (DerivedData.isValidNResultsDisplay(nResultsDisplay, election)) {
      return election.baseResultList[nResultsDisplay - 1].entID;
    }

    return ArrayX.last(election.baseResultList).entID;
  }

  static getNResultsDisplay(nResultsDisplay, election) {
    if (!election.isLoaded) {
      return null;
    }
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
}

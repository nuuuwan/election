import { ElectionModel } from "../../nonview/core";

export default class DerivedData {
  static getActivePDID(activePDID, nResultsDisplay, election) {
    if (activePDID) {
      return activePDID;
    } 
      if (
        nResultsDisplay
      ) {
        return election.pdResultList[nResultsDisplay - 1].entID;
      }
      return election.pdResultList[election.pdResultList.length - 1].entID;
  }


  static getNResultsDisplay(nResultsDisplay, election) {
    if (nResultsDisplay || nResultsDisplay === 0) {
      return nResultsDisplay;
    } 
    return election.pdResultList.length;
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

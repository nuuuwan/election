import { ElectionModel } from "../../nonview/core";

export default class DerivedData {
  static getActivePDIDAndNResultDisplay(activePDID, nResultsDisplay, election) {
    if (activePDID) {
      nResultsDisplay =
        election.pdResultList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    } else if (nResultsDisplay || nResultsDisplay === 0) {
      if (
        nResultsDisplay > 0 &&
        nResultsDisplay <= election.pdResultList.length
      ) {
        activePDID = election.pdResultList[nResultsDisplay - 1].entID;
      }
    } else {
      activePDID =
        election.pdResultList[election.pdResultList.length - 1].entID;
      nResultsDisplay = election.pdResultList.length;
    }
    return { activePDID, nResultsDisplay };
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

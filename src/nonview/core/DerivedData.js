import { ElectionModel } from "../../nonview/core";

export default class DerivedData {
  static getActivePDIDAndNResultDisplay({
    activePDID,
    nResultsDisplay,
    election,
  }) {
    if (activePDID !== undefined) {
      nResultsDisplay =
        election.pdResultList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    } else if (nResultsDisplay !== undefined) {
      if (nResultsDisplay > 0) {
        activePDID = election.pdResultList[nResultsDisplay - 1].entID;
      }
    } else {
      activePDID =
        election.pdResultList[election.pdResultList.length - 1].entID;
      nResultsDisplay = election.pdResultList.length;
    }
    return { activePDID, nResultsDisplay };
  }

  static getPredictedElection(election, electionDisplay, db) {
    const releasedPDIDList = electionDisplay.pdIDList;
    const nonReleasedPDIDList = Object.keys(db.pdIdx).filter(
      (pdID) => !releasedPDIDList.includes(pdID)
    );

    const electionModel = new ElectionModel(
      db.elections,
      election,
      releasedPDIDList,
      nonReleasedPDIDList
    );
    const projectedElection = electionModel.getElectionNotReleasedPrediction();
    return projectedElection;
  }

  static getDerived(nResultsDisplay, election, db) {
    const electionDisplay = election.getElectionSubset(nResultsDisplay);

    let projectedElection;
    if (nResultsDisplay > 0) {
      projectedElection = DerivedData.getPredictedElection(
        election,
        electionDisplay,
        db
      );
    }
    return { electionDisplay, projectedElection };
  }
}

import { Election } from "../../../nonview/core";

const BasePageSettersMixin = {
  async setElection(election0) {
    let { activePDID, nResultsDisplay } = this.state;

    const { electionType, date } = election0;
    const election = await Election.fromElectionTypeAndDate(electionType, date);

    if (!election.isFuture) {
      if (!election.resultIdx[activePDID]) {
        activePDID = election.pdResultList[nResultsDisplay - 1].entID;
      }
      nResultsDisplay =
        election.pdResultList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    }

    this.setStateAndContext({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      election,
    });
  },

  setActivePDID(activePDID) {
    const { election, db } = this.state;
    const nResultsDisplay =
      election.pdResultList.findIndex(
        (result) => result.entID === activePDID
      ) + 1;

    const electionDisplay = election.getElectionSubset(nResultsDisplay);
    const predictedElection = this.getPredictedElection(election, electionDisplay, db);

    this.setStateAndContext({ activePDID, nResultsDisplay, electionDisplay, predictedElection });
  },

  setNResultsDisplay(nResultsDisplay) {
    const { election, db } = this.state;
    const pdIDs = election.pdResultList.map((pdResult) => pdResult.entID);
    const activePDID = pdIDs[nResultsDisplay - 1];

    const electionDisplay = election.getElectionSubset(nResultsDisplay);
    const predictedElection = this.getPredictedElection(election, electionDisplay, db);

    this.setStateAndContext({ nResultsDisplay, activePDID , electionDisplay, predictedElection});
  },
};

export default BasePageSettersMixin;

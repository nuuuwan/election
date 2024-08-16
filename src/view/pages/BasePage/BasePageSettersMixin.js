import { Election } from "../../../nonview/core";

const BasePageSettersMixin = {
  async setElection(election0) {
    let { activePDID, nResultsDisplay } = this.state;

    const { electionType, date } = election0;
    const election = await Election.fromElectionTypeAndDate(electionType, date);

    if (!election.isFuture) {
      if (!election.resultsIdx[activePDID]) {
        activePDID = election.pdResultsList[nResultsDisplay - 1].entID;
      }
      nResultsDisplay =
        election.pdResultsList
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
    const nResultsDisplay =
      this.pdResultsList.findIndex((result) => result.entID === activePDID) + 1;
    this.setStateAndContext({ activePDID, nResultsDisplay });
  },

  setNResultsDisplay(nResultsDisplay) {
    const { election } = this.state;
    const pdIDs = election.pdResultsList.map((pdResult) => pdResult.entID);
    const activePDID = pdIDs[nResultsDisplay - 1];

    this.setStateAndContext({ nResultsDisplay, activePDID });
  },

  async playAnimation() {
    this.setStateAndContext(
      { isPlaying: true },
      async function () {
        while (true) {
          if (this.state.isPlaying === false) {
            break;
          }
          if (this.state.nResultsDisplay >= this.nResultsReleased) {
            this.setState({ isPlaying: false });
            break;
          }
          this.setNResultsDisplay(this.state.nResultsDisplay + 1);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }.bind(this)
    );
  },

  async pauseAnimation() {
    this.setStateAndContext({ isPlaying: false });
  },
};

export default BasePageSettersMixin;

import { URLContext } from "../../../nonview/base";
import { Election } from "../../../nonview/core";

const BasePageSettersMixin = {

  setStateAndContext(newState, funcRunAfter = undefined) {
    const oldState = this.state;

    const { electionType, date, nResultsDisplay, activePDID, lang } =
      Object.assign({}, oldState, newState);

    URLContext.set({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      lang,
    });

    this.setState(newState, function () {
      if (funcRunAfter) {
        funcRunAfter();
      }
    });
  },

  async setElection(election0) {
    let { activePDID, nResultsDisplay, db } = this.state;

    const { electionType, date } = election0;

    const election = await Election.fromElectionTypeAndDate(electionType, date);
    if (!election.isFuture) {
      if (!election.getResult(activePDID)) {
        activePDID = election.pdResultList[nResultsDisplay - 1].entID;
      }
      nResultsDisplay =
        election.pdResultList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    }

    const { electionDisplay, projectedElection } = this.getDerived(
      nResultsDisplay,
      election,
      db
    );

    this.setStateAndContext({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      election,
      electionDisplay,
      projectedElection,
    });
  },

  setActivePDID(activePDID) {
    const { election, db } = this.state;
    const nResultsDisplay =
      election.pdResultList.findIndex((result) => result.entID === activePDID) +
      1;

    const { electionDisplay, projectedElection } = this.getDerived(
      nResultsDisplay,
      election,
      db
    );

    this.setStateAndContext({
      activePDID,
      nResultsDisplay,
      electionDisplay,
      projectedElection,
    });
  },

  setNResultsDisplay(nResultsDisplay) {
    const { election, db } = this.state;
    const pdIDs = election.pdResultList.map((pdResult) => pdResult.entID);
    const activePDID = pdIDs[nResultsDisplay - 1];

    const { electionDisplay, projectedElection } = this.getDerived(
      nResultsDisplay,
      election,
      db
    );

    this.setStateAndContext({
      nResultsDisplay,
      activePDID,
      electionDisplay,
      projectedElection,
    });
  },

  setLang(lang) {
    this.setStateAndContext({ lang });
  },
};

export default BasePageSettersMixin;

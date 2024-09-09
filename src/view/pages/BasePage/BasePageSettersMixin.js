import CustomURLContext from "../../../nonview/core/CustomURLContext";

const BasePageSettersMixin = {
  setStateAndContext(newState, funcRunAfter = undefined) {
    const oldState = this.state;

    const { electionType, date, nResultsDisplay, activePDID, lang, noScroll } =
      Object.assign({}, oldState, newState);

    CustomURLContext.set({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      lang,
      noScroll,
    });

    this.setState(newState, function () {
      if (funcRunAfter) {
        funcRunAfter();
      }
    });
  },

  async setElection(election0) {
    const { electionType, date } = election0;

    this.setStateAndContext({
      electionType,
      date,
    });
  },

  setActivePDID(activePDID) {
    this.setStateAndContext({
      activePDID,
    });
  },

  setNResultsDisplay(nResultsDisplay) {
    this.setStateAndContext({
      nResultsDisplay,
    });
  },

  setLang(lang) {
    this.setStateAndContext({ lang });
  },
};

export default BasePageSettersMixin;

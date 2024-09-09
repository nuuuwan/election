import { useState } from "react";
import {DataProvider} from "../../nonview/core";
import { CustomURLContext } from "../../nonview/core";
import BasePageView from "../../view/molecules/BasePageView/BasePageView";

export default function BasePage() {
  const [state, setState] = useState(CustomURLContext.get());

  const updateState = function (newState) {
    const oldState = state;
    const newState0 = Object.assign({}, oldState, newState);
    CustomURLContext.set(newState0);
    setState(newState0);
  };

  const setElection = function (election0) {
    const { electionType, date } = election0;
    updateState({ electionType, date });
  };

  const setActivePDID = function (activePDID) {
    updateState({ activePDID });
  };

  const setNResultsDisplay = function (nResultsDisplay) {
    updateState({ nResultsDisplay });
  };

  const setLang = function (lang) {
    updateState({ lang });
  };

  const { electionType, date, activePDID, nResultsDisplay, lang, noScroll } =
    state;

  return (
    <DataProvider
      electionType={electionType}
      date={date}
      activePDID={activePDID}
      nResultsDisplay={nResultsDisplay}
      lang={lang}
      noScroll={noScroll}
    >
      <BasePageView
        setLang={setLang}
        setActivePDID={setActivePDID}
        setElection={setElection}
        setNResultsDisplay={setNResultsDisplay}
      />
    </DataProvider>
  );
}

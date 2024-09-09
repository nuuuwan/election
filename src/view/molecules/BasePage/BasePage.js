import { useState } from "react";
import { DataProvider } from "../../../nonview/core";
import { CustomURLContext } from "../../../nonview/core";
import BasePageView from "./BasePageView";
import BasePageHandlerProvider from "./BasePageHandlerProvider";

export default function BasePage() {
  const [state, setState] = useState(CustomURLContext.get());

  const updateState = function (newState) {
    const newState0 = Object.assign({}, state, newState);
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
    const activePDID = undefined;
    updateState({ nResultsDisplay, activePDID });
  };

  const setLang = function (lang) {
    updateState({ lang });
  };

  return (
    <DataProvider state={state}>
      <BasePageHandlerProvider
        handlers={{
          setLang,
          setActivePDID,
          setElection,
          setNResultsDisplay,
        }}
      >
        <BasePageView />
      </BasePageHandlerProvider>
    </DataProvider>
  );
}

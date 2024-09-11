import { useState } from "react";
import { DataProvider } from "../../../nonview/core";
import { CustomURLContext } from "../../../nonview/core";
import BasePageView from "./BasePageView";
import BasePageHandlerProvider from "./BasePageHandlerProvider";

function getHandlers(updateState) {
  const setElection = function (election0) {
    const { electionType, date } = election0;
    updateState({ electionType, date });
  };

  const setActivePDID = function (activePDID) {
    updateState({ activePDID });
  };

  const setNResultsDisplay = function (nResultsDisplay) {
    updateState({ nResultsDisplay, activePDID: undefined });
  };

  const setLang = function (lang) {
    updateState({ lang });
    window.location.reload();
  };

  return {
    setLang,
    setActivePDID,
    setElection,
    setNResultsDisplay,
  };
}

export default function BasePage() {
  const [state, setState] = useState(CustomURLContext.get());

  const updateState = function (newState) {
    const newState0 = Object.assign({}, state, newState);
    CustomURLContext.set(newState0);
    setState(newState0);
  };

  return (
    <DataProvider state={state}>
      <BasePageHandlerProvider handlers={getHandlers(updateState)}>
        <BasePageView />
      </BasePageHandlerProvider>
    </DataProvider>
  );
}
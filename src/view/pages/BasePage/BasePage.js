import { useState } from "react";
import { DataProvider, DataSlowProvider } from "../../../nonview";
import { CustomURLContext } from "../../../nonview";
import BasePageView from "./BasePageView";
import BasePageHandlerProvider from "./BasePageHandlerProvider";

function getHandlers(updateState) {
  const setElection = function (election0) {
    const { electionType, date } = election0;
    updateState({ electionType, date, nResultsDisplay: null });
  };

  const setActiveEntID = function (activeEntID) {
    updateState({ activeEntID });
  };

  const setNResultsDisplay = function (nResultsDisplay) {
    updateState({ nResultsDisplay, activeEntID: undefined });
  };

  const setLang = function (lang) {
    updateState({ lang });
    window.location.reload();
  };

  return {
    setLang,
    setActiveEntID,
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
      <DataSlowProvider state={state}>
        <BasePageHandlerProvider handlers={getHandlers(updateState)}>
          <BasePageView />
        </BasePageHandlerProvider>
      </DataSlowProvider>
    </DataProvider>
  );
}

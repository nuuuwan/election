import { useState } from 'react';
import {
  DataProvider,
  DataSlowProvider,
  CustomURLContext,
} from '../../../nonview';
import BasePageView from './BasePageView';
import BasePageHandlerProvider from './BasePageHandlerProvider';

function getGroupHandlers(updateState) {
  const setGroupAggregatedResults = function (groupAggregatedResults) {
    updateState({ groupAggregatedResults });
  };

  const setGroupMonitoring = function (groupMonitoring) {
    updateState({ groupMonitoring });
  };

  const setGroupModelInsights = function (groupModelInsights) {
    updateState({ groupModelInsights });
  };

  return {
    setGroupAggregatedResults,
    setGroupMonitoring,
    setGroupModelInsights,
  };
}

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

  console.debug(state);

  const updateState = function (newState) {
    const newState0 = Object.assign({}, state, newState);
    CustomURLContext.set(newState0);
    setState(newState0);
  };

  const handlers = Object.assign(
    {},
    getHandlers(updateState),
    getGroupHandlers(updateState),
  );

  return (
    <DataProvider state={state}>
      <DataSlowProvider state={state}>
        <BasePageHandlerProvider handlers={handlers}>
          <BasePageView />
        </BasePageHandlerProvider>
      </DataSlowProvider>
    </DataProvider>
  );
}

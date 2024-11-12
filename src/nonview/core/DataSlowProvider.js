import React, { useState, useEffect, createContext, useContext } from 'react';

import { ElectionModel, Timer, ElectionHistory } from '..';
import { useDataContext } from './DataProvider';
import ElectionProjectedWithError from './ElectionModel/ElectionProjectedWithError';

const DataSlowContext = createContext();

function getElectionProjected(electionDisplay, electionHistory) {
  if (electionHistory.length === 0) {
    return electionDisplay;
  }
  const electionModel = new ElectionModel(
    electionDisplay,
    electionHistory.previousElectionList,
  );
  return electionModel.electionProjected;
}

function getElectionDisplayPrevious(electionDisplay, electionPrevious) {
  if (!electionPrevious) {
    return null;
  }
  return electionPrevious.getSubsetElectionByEntIDList(
    electionDisplay.baseEntIDList,
  );
}

function getElectionProjectedPrevious(
  electionDisplayPrevious,
  electionHistory,
) {
  if (!electionDisplayPrevious) {
    return null;
  }
  const electionModelPrevious = new ElectionModel(
    electionDisplayPrevious,
    electionHistory.previousHistory.previousElectionList,
  );

  const electionProjectedPrevious = electionModelPrevious.electionProjected;
  return electionProjectedPrevious;
}

function getElectionProjectedWithError({
  electionDisplay,
  electionProjected,
  electionPrevious,
  electionProjectedPrevious,
}) {
  if (!electionProjected || !electionProjectedPrevious) {
    return null;
  }
  return ElectionProjectedWithError.getElectionProjectedWithError({
    electionDisplay,
    electionProjected,
    electionPrevious,
    electionProjectedPrevious,
  });
}

function getProjectedElections({
  electionDisplay,
  electionHistory,
  electionPrevious,
}) {
  const electionProjected = getElectionProjected(
    electionDisplay,
    electionHistory,
  );

  const electionDisplayPrevious = getElectionDisplayPrevious(
    electionDisplay,
    electionPrevious,
  );

  const electionProjectedPrevious = getElectionProjectedPrevious(
    electionDisplayPrevious,
    electionHistory,
  );

  const electionProjectedWithError = getElectionProjectedWithError({
    electionDisplay,
    electionProjected,
    electionPrevious,
    electionProjectedPrevious,
  });

  return {
    electionProjected,
    electionDisplayPrevious,
    electionProjectedPrevious,
    electionProjectedWithError,
  };
}

async function getElectionValuesSlow({
  nResultsDisplay,
  electionDisplay,
  entIdx,
}) {
  const inner = async function () {
    const electionHistory = await ElectionHistory.load(electionDisplay);
    const electionPrevious = electionHistory.electionPrevious;

    let projectedValues = {};

    if (nResultsDisplay !== 0) {
      // electionProjected,
      // electionDisplayPrevious,
      // electionProjectedPrevious,
      // electionProjectedWithError,

      projectedValues = getProjectedElections({
        electionDisplay,
        electionHistory,
        electionPrevious,
        entIdx,
      });
    }

    return {
      electionHistory,
      electionPrevious,
      ...projectedValues,
    };
  };
  return await Timer.logAsync(
    'DataSlowProvider.getElectionValuesSlow',
    1_000,
    inner,
  );
}

async function getValue(state, data) {
  if (!data) {
    return null;
  }

  const slowValues = await getElectionValuesSlow(data);

  return Object.assign({}, data, slowValues);
}

export default function DataSlowProvider({ children, state }) {
  const [value, setValue] = useState(null);
  const data = useDataContext();

  useEffect(
    function () {
      async function loadValue() {
        const value = await getValue(state, data);
        setValue(value);
      }
      Timer.logAsync('DataSlowProvider.loadValue', 1000, loadValue);
    },
    [state, data],
  );

  return (
    <DataSlowContext.Provider value={value}>
      {children}
    </DataSlowContext.Provider>
  );
}

export function useDataSlowContext() {
  return useContext(DataSlowContext);
}

import React, { useState, useEffect, createContext, useContext } from 'react';

import { ElectionModel, Timer, ElectionHistory } from '..';
import { useDataContext } from './DataProvider';
import ElectionProjectedWithError from './ElectionModel/ElectionProjectedWithError';

const DataSlowContext = createContext();

function getProjectedElections({
  electionDisplay,
  electionHistory,
  electionPrevious,
}) {
  const electionModel = new ElectionModel(
    electionDisplay,
    electionHistory.previousElectionList,
  );
  const electionProjected = electionModel.electionProjected;

  const electionDisplayPrevious = electionPrevious.getSubsetElectionByEntIDList(
    electionDisplay.baseEntIDList,
  );

  const electionModelPrevious = new ElectionModel(
    electionDisplayPrevious,
    electionHistory.previousHistory.previousElectionList,
  );

  const electionProjectedPrevious = electionModelPrevious.electionProjected;

  const electionProjectedWithError =
    ElectionProjectedWithError.getElectionProjectedWithError(
      electionDisplay,
      electionProjected,
      electionPrevious,
      electionProjectedPrevious,
    );

  return {
    electionProjected,
    electionDisplayPrevious,
    electionProjectedPrevious,
    electionProjectedWithError,
  };
}

async function getElectionValuesSlow({ electionDisplay }) {
  const inner = async function () {
    const electionHistory = await ElectionHistory.load(electionDisplay);
    const electionPrevious = electionHistory.electionPrevious;

    const {
      electionProjected,
      electionDisplayPrevious,
      electionProjectedPrevious,
      electionProjectedWithError,
    } = getProjectedElections({
      electionDisplay,
      electionHistory,
      electionPrevious,
    });

    return {
      electionHistory,
      electionPrevious,
      electionProjected,
      electionDisplayPrevious,
      electionProjectedPrevious,
      electionProjectedWithError,
    };
  };
  return await Timer.logAsync(
    'DataSlowProvider.getElectionValuesSlow',
    10_000,
    inner,
  );
}

async function getValue(state, data) {
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const slowValues = await getElectionValuesSlow({
    electionDisplay,
  });

  return Object.assign({}, data, slowValues);
}

export default function DataSlowProvider({ children, state }) {
  const [value, setValue] = useState(null);
  const data = useDataContext();

  useEffect(
    function () {
      const loadValue = async function () {
        const value = await getValue(state, data);
        setValue(value);
      };
      Timer.logAsync('DataSlowProvider.loadValue', 10_000, loadValue);
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

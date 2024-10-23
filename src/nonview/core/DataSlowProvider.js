import React, { useState, useEffect, createContext, useContext } from 'react';

import { ElectionModel, Timer, ElectionHistory } from '..';
import { useDataContext } from './DataProvider';

const DataSlowContext = createContext();

async function getElectionValuesSlow({ electionDisplay }) {
  const inner = async function () {
    const electionHistory = await ElectionHistory.load(electionDisplay);
    const electionPrevious = electionHistory.electionPrevious;

    const electionModel = new ElectionModel(electionHistory);
    const electionProjected = electionModel.electionProjected;

    return {
      electionHistory,
      electionPrevious,
      electionProjected,
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

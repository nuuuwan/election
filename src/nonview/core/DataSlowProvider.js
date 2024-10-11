import React, { useState, useEffect, createContext, useContext } from "react";

import { Timer } from "..";
import { DerivedData, ElectionHistory } from "..";
import { useDataContext } from "./DataProvider";

const DataSlowContext = createContext();

async function getElectionHistory() {
  return await Timer.logAsync(
    "DataSlowProvider.getElectionHistory",
    500,
    async function () {
      
      return await ElectionHistory.load();
    }
  );
}

async function getElectionValuesSlow({ election, electionDisplay, entIdx }) {
  const inner = async function () {
    const electionHistory = await getElectionHistory();

    const electionPrevious = electionHistory.getPreviousElectionOfSameType(election);

    const electionProjected = DerivedData.getElectionProjected(
      election,
      electionDisplay,
      entIdx,
      electionHistory,
    );

    return { electionHistory, electionPrevious, electionProjected };
  };
  return await Timer.logAsync(
    "DataSlowProvider.getElectionValuesSlow",
    10_000,
    inner
  );
}

async function getValue(state, data) {
  if (!data) {
    return null;
  }
  const { election, electionDisplay, entIdx } = data;

  const { electionHistory, electionPrevious, electionProjected } =
    await getElectionValuesSlow({
      election,
      electionDisplay,
      entIdx,
    });

  return Object.assign({}, data, {
    electionProjected,
    electionHistory,
    electionPrevious,
  });
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
      Timer.logAsync("DataSlowProvider.loadValue", 10_000, loadValue);
    },
    [state, data]
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

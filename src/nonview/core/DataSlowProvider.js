import React, { useState, useEffect, createContext, useContext } from "react";

import { ElectionModel, Timer, ElectionHistory } from "..";
import { useDataContext } from "./DataProvider";

const DataSlowContext = createContext();

async function getElectionValuesSlow({ election, electionDisplay }) {
  const inner = async function () {
    const electionHistory = await ElectionHistory.load();
    const electionPrevious =
      electionHistory.getPreviousElectionOfSameType(election);

    const electionProjected = ElectionModel.getElectionProjected(
      electionDisplay,
      electionHistory
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
  const { election, electionDisplay } = data;

  const { electionHistory, electionPrevious, electionProjected } =
    await getElectionValuesSlow({
      election,
      electionDisplay,
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

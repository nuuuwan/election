import React, { useState, useEffect, createContext, useContext } from "react";

import { Timer } from "..";
import { DerivedData, Election } from "..";
import { useDataContext } from "./DataProvider";

const DataSlowContext = createContext();

async function getElections() {
  return await Timer.logAsync(
    "DataSlowProvider.getElections",
    500,
    async function () {
      return await Election.listAll();
    }
  );
}

async function getElectionValuesSlow({
  election,
  nResultsDisplayDerived,
  electionDisplay,
  entIdx,
}) {
  const inner = async function () {
    const elections = await getElections();

    const electionPrevious = Election.getPenultimateElectionOfSameType(
      elections,
      election
    );

    let electionProjected = null;
    if (nResultsDisplayDerived > 0 && electionPrevious) {
      electionProjected = DerivedData.getPredictedElection(
        election,
        electionDisplay,
        entIdx,
        elections
      );
    }
    return { elections, electionPrevious, electionProjected };
  };
  return await Timer.logAsync(
    "DataSlowProvider.getElectionValuesSlow",
    500,
    inner
  );
}

async function getValue(state, data) {
  if (!data) {
    return null;
  }
  const {election, nResultsDisplayDerived, electionDisplay, entIdx} = data;

  const { elections, electionPrevious, electionProjected } =
    await getElectionValuesSlow({
      election,
      nResultsDisplayDerived,
      electionDisplay,
      entIdx,
    });


  return Object.assign(
    {},
    data,
    { electionProjected, elections, electionPrevious }
  );
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
      Timer.logAsync("DataSlowProvider.loadValue", 500, loadValue);
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

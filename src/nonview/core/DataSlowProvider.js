import React, { useState, useEffect, createContext, useContext } from "react";

import {  Timer } from "..";
import { CustomURLContext, DerivedData, Election } from "..";
import { getEntValues, getElectionValues } from "./DataProvider";


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
    if (nResultsDisplayDerived > 0) {
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

async function getValue(state) {
  const entValues = await getEntValues();

  const {
    election,
    activeEntIDDerived,
    nResultsDisplayDerived,
    electionDisplay,
  } = await getElectionValues(state);

  const entIdx = election.getEntIdx(entValues);

  const { elections, electionPrevious, electionProjected } =
    await getElectionValuesSlow({
      election,
      nResultsDisplayDerived,
      electionDisplay,
      entIdx,
    });

  const newState = {
    ...state,
    activeEntID: activeEntIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
  };
  CustomURLContext.set(newState);

  return Object.assign(
    {},
    newState,
    entValues,
    { election, electionDisplay },
    { entIdx },
    { electionProjected, elections, electionPrevious }
  );
}

export default function DataSlowProvider({ children, state }) {
  const [value, setValue] = useState(null);

  useEffect(
    function () {
      const loadValue = async function () {
        const value = await getValue(state);
        setValue(value);
      };
      Timer.logAsync("DataSlowProvider.loadValue", 500, loadValue);
    },
    [state]
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

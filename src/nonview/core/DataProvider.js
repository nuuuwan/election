import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType, Timer } from "..";
import { CustomURLContext, DerivedData, Election } from "..";
import { GROUP_ID_TO_PD_ID_LIST } from "..";

const DataContext = createContext();

async function getEntValues() {
  const inner = async function () {
    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
    const ezIdx = Object.fromEntries(
      Object.keys(GROUP_ID_TO_PD_ID_LIST).map(function (ezID) {
        return [ezID, new Ent({ id: ezID, name: ezID })];
      })
    );

    const allRegionIdx = Object.assign(
      { LK: { name: "Sri Lanka" } },
      pdIdx,
      edIdx,
      provinceIdx,
      ezIdx
    );

    return { pdIdx, edIdx, provinceIdx, ezIdx, allRegionIdx };
  };

  return await Timer.logAsync("DataProvider.getEntValues", 500, inner);
}

async function getElections() {
  return await Timer.logAsync(
    "DataProvider.getElections",
    500,
    async function () {
      return await Election.listAll();
    }
  );
}

async function getElectionValues({
  electionType,
  date,
  activeEntID,
  nResultsDisplay,
}) {
  const inner = async function () {
    const election = await Election.fromElectionTypeAndDate(electionType, date);

    const activeEntIDDerived = DerivedData.getActiveEntID(
      activeEntID,
      nResultsDisplay,
      election
    );
    const nResultsDisplayDerived = DerivedData.getNResultsDisplay(
      nResultsDisplay,
      election
    );

    const electionDisplay = election.getElectionSubset(nResultsDisplayDerived);

    return {
      election,
      activeEntIDDerived,
      nResultsDisplayDerived,
      electionDisplay,
    };
  };
  return await Timer.logAsync("DataProvider.getElectionValues", 500, inner);
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
  return await Timer.logAsync("DataProvider.getElectionValuesSlow", 500, inner);
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

export default function DataProvider({ children, state }) {
  const [value, setValue] = useState(null);

  useEffect(
    function () {
      const loadValue = async function () {
        const value = await getValue(state);
        setValue(value);
      };
      Timer.logAsync("DataProvider.loadValue", 500, loadValue);
    },
    [state]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}

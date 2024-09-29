import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType, Time } from "..";
import { CustomURLContext, DerivedData, Election } from "..";
import { GROUP_ID_TO_PD_ID_LIST } from "..";

const DataContext = createContext();

async function getEntValues() {
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
}

async function getElectionValues({ electionType, date }) {
  const elections = await Election.listAll();

  const election = await Election.fromElectionTypeAndDate(electionType, date);

  const electionPrevious = Election.getPenultimateElectionOfSameType(
    elections,
    election
  );

  return { elections, election, electionPrevious };
}

async function getValue(state) {
  const electionValues = await getElectionValues(state);

  const entValues = await getEntValues();
  const activeEntIDDerived = DerivedData.getActiveEntID(
    state.activeEntID,
    state.nResultsDisplay,
    electionValues.election
  );
  const nResultsDisplayDerived = DerivedData.getNResultsDisplay(
    state.nResultsDisplay,
    electionValues.election
  );

  const entIdx = electionValues.election.getEntIdx(entValues);

  const derivedElectionValues = DerivedData.getDerived(
    nResultsDisplayDerived,
    electionValues.election,
    entIdx,
    electionValues.elections
  );
  const newState = {
    ...state,
    activeEntID: activeEntIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
  };
  CustomURLContext.set(newState);
  console.debug("🤑", "DataProvider.getValue");
  return Object.assign(
    {},
    newState,
    entValues,
    { entIdx: entIdx },
    electionValues,
    derivedElectionValues
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
      loadValue();
    },
    [state]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}

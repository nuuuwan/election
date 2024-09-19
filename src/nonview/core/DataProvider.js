import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType, Time } from "../base";
import { CustomURLContext, DerivedData, Election } from ".";
import { GROUP_ID_TO_PD_ID_LIST } from "../constants";

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
  const entValues = await getEntValues();
  const electionValues = await getElectionValues(state);
  const activeEntIDDerived = DerivedData.getActiveEntID(
    state.activeEntID,
    state.nResultsDisplay,
    electionValues.election
  );
  const nResultsDisplayDerived = DerivedData.getNResultsDisplay(
    state.nResultsDisplay,
    electionValues.election
  );

  let entIdx;
  if (electionValues.election.baseEntType === EntType.PD) {
    entIdx = entValues.pdIdx;
  } else if (electionValues.election.baseEntType === EntType.ED) {
    entIdx = entValues.edIdx;
  } else {
    throw new Error("Unknown EntType: " + electionValues.election.baseEntType);
  }

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
    electionValues,
    derivedElectionValues
  );
}

export default function DataProvider({ children, state }) {
  const [value, setValue] = useState(null);
  const [appTime, setAppTime] = useState(Time.now().dateTimeString);

  const REFRESH_INTERVAL = 60;
  setTimeout(() => {
    setAppTime(Time.now().dateTimeString);
  }, REFRESH_INTERVAL * 1_000);

  useEffect(
    function () {
      const loadValue = async function () {
        const value = await getValue(state);
          setValue(Object.assign({ appTime }, value));
      };

      loadValue();
    },
    [state, appTime]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}

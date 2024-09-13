import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType } from "../base";
import { CustomURLContext, DerivedData, Election } from ".";
import { GROUP_ID_TO_PD_ID } from "../constants";

const DataContext = createContext();

async function getValueEnts() {
  const pdIdx = await Ent.idxFromType(EntType.PD);
  const edIdx = await Ent.idxFromType(EntType.ED);
  const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
  const ezIdx = Object.fromEntries(
    Object.keys(GROUP_ID_TO_PD_ID).map(function (ezID) {
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

async function getValueElections({ electionType, date }) {
  const elections = await Election.listAll();

  const election = await Election.fromElectionTypeAndDate(electionType, date);
  return { elections, election };
}

async function getValue({
  electionType,
  date,
  activePDID,
  nResultsDisplay,

  lang,
}) {
  const { pdIdx, edIdx, provinceIdx, ezIdx, allRegionIdx } =
    await getValueEnts();

  const { elections, election } = await getValueElections({
    electionType,
    date,
  });

  const activePDIDDerived = DerivedData.getActivePDID(
    activePDID,
    nResultsDisplay,
    election
  );

  const nResultsDisplayDerived = DerivedData.getNResultsDisplay(
    nResultsDisplay,
    election
  );

  const { electionDisplay, electionProjected } = DerivedData.getDerived(
    nResultsDisplayDerived,
    election,
    pdIdx,
    elections
  );

  CustomURLContext.set({
    electionType,
    date,
    activePDID: activePDIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
    lang,
  });

  return {
    election,
    electionDisplay,
    elections,
    electionProjected,
    pdIdx,
    edIdx,
    provinceIdx,
    ezIdx,
    allRegionIdx,
    activePDID: activePDIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
    electionType,
    date,

    lang,
  };
}

export default function DataProvider({ children, state }) {
  const [value, setValue] = useState(null);

  useEffect(
    function () {
      const loadValue = async function () {
        try {
          const value = await getValue(state);
          setValue(value);
        } catch (err) {
          console.error(err);
        }
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

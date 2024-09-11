import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType } from "../base";
import { DerivedData, Election } from ".";

const DataContext = createContext();

async function getValueEnts() {
  const pdIdx = await Ent.idxFromType(EntType.PD);
  const edIdx = await Ent.idxFromType(EntType.ED);
  const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);

  const allRegionIdx = Object.assign(
    { LK: { name: "Sri Lanka" } },
    pdIdx,
    edIdx,
    provinceIdx
  );

  return { pdIdx, edIdx, provinceIdx, allRegionIdx };
}

async function getValueElections({ electionType, date }) {
  const elections = await Election.listAll();

  const election = await Election.fromElectionTypeAndDate(electionType, date);
  return { elections, election };
}

async function getValue({ electionType, date, activePDID, nResultsDisplay, noScroll, lang }) {
  const { pdIdx, edIdx, provinceIdx, allRegionIdx } = await getValueEnts();

  const { elections, election } = await getValueElections({
    electionType,
    date,
  });

  const {
    activePDID: activePDIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
  } = DerivedData.getActivePDIDAndNResultDisplay(
    activePDID,
    nResultsDisplay,
    election
  );

  const { electionDisplay, projectedElection } = DerivedData.getDerived(
    nResultsDisplayDerived,
    election,
    pdIdx,
    elections
  );

  return {
    election,
    electionDisplay,
    elections,
    projectedElection,
    pdIdx,
    edIdx,
    provinceIdx,
    allRegionIdx,
    activePDID: activePDIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
    electionType, date, noScroll, lang,
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

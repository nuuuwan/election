import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType } from "../base";
import { DerivedData, Election } from ".";

const DataContext = createContext();

async function getValue(state) {
  const { electionType, date, activePDID, nResultsDisplay } = state;

  const pdIdx = await Ent.idxFromType(EntType.PD);
  const edIdx = await Ent.idxFromType(EntType.ED);
  const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);

  const allRegionIdx = Object.assign({'LK': {name: 'Sri Lanka'}}, pdIdx, edIdx, provinceIdx);

  const elections = await Election.listAll();

  const election = await Election.fromElectionTypeAndDate(electionType, date);

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
    pdIdx,
    edIdx,
    provinceIdx,
    elections,
    election,
    activePDID: activePDIDDerived,
    nResultsDisplay: nResultsDisplayDerived,
    electionDisplay,
    projectedElection,
    allRegionIdx,
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

import React, { useState, useEffect, createContext, useContext } from "react";

import { Ent, EntType } from "../base";
import { DerivedData, Election } from ".";

const DataContext = createContext();

async function getValue({ electionType, date, activePDID, nResultsDisplay }) {
  const pdIdx = await Ent.idxFromType(EntType.PD);
  const edIdx = await Ent.idxFromType(EntType.ED);
  const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
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
  };
}

export default function DataProvider({
  children,
  electionType,
  date,
  activePDID,
  nResultsDisplay,
  lang,
  noScroll,
}) {
  const [value, setValue] = useState(null);

  useEffect(
    function () {
      const loadValue = async function () {
        try {
          const value = await getValue({
            electionType,
            date,
            activePDID,
            nResultsDisplay,
            lang,
            noScroll,
          });
          setValue(value);
        } catch (err) {
          console.error(err);
        }
      };

      loadValue();
    },
    [electionType, date, activePDID, nResultsDisplay, lang, noScroll]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}

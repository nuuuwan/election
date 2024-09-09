import React, { createContext, useState, useEffect } from "react";

import { Ent, EntType } from "../base";
import { DerivedData, Election } from ".";


const DataContext = createContext();

export const DataProvider = function ({ children, electionType, date, activePDID,
  nResultsDisplay, }) {
  const [value, setValue] = useState(null);

  useEffect(
    function () {
      const loadValue = async function () {
        console.debug("DataProvider.loadValue complete.", {
          electionType, date, activePDID,
nResultsDisplay
        });

        try {
          const pdIdx = await Ent.idxFromType(EntType.PD);
          const edIdx = await Ent.idxFromType(EntType.ED);
          const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
          const elections = await Election.listAll();

          const election = await Election.fromElectionTypeAndDate(
            electionType,
            date
          );

          const { activePDID: activePDIDDerived, nResultsDisplay: nResultsDisplayDerived } =
            DerivedData.getActivePDIDAndNResultDisplay(
              activePDID,
              nResultsDisplay,
              election,
            );
            
          const { electionDisplay, projectedElection } = DerivedData.getDerived(nResultsDisplayDerived, election, pdIdx, elections

          );


          const value = { pdIdx, edIdx, provinceIdx, elections, election ,             activePDID: activePDIDDerived,
            nResultsDisplay: nResultsDisplayDerived,
            electionDisplay, projectedElection,};



          setValue(value);
          
        } catch (err) {
          console.error(err);
        }
      };

      loadValue();
    },
    [electionType, date, activePDID,
      nResultsDisplay]
  );

  return (
    <DataContext.Provider value={value} >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;

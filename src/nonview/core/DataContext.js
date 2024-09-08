import React, { createContext, useState, useEffect } from "react";

import { Ent, EntType } from "../base";
import { Election } from ".";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const loadValue = async () => {
      try {
        const pdIdx = await Ent.idxFromType(EntType.PD);
        const edIdx = await Ent.idxFromType(EntType.ED);
        const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
        const elections = await Election.listAll();

        const value = { pdIdx, edIdx, provinceIdx, elections };
        setValue(value);
      } catch (err) {
        console.error(err);
      }
    };

    loadValue();
  }, []);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default DataContext;

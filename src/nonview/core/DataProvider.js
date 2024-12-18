import React, { useState, useEffect, createContext, useContext } from 'react';
import Timer from '../base/Timer';
import { CustomLoadingProgress } from '../../view';
import { DataProviderUtils } from '..';

const DataContext = createContext();

export default function DataProvider({ children, state }) {
  const [value, setValue] = useState(null);

  useEffect(
    function () {
      Timer.logAsync('DataProvider.loadValue', 100, async function () {
        const value = await DataProviderUtils.getValue(state);
        setValue(value);
      });
    },
    [state],
  );

  return (
    <DataContext.Provider value={value}>
      {value ? children : <CustomLoadingProgress />}
    </DataContext.Provider>
  );
}

export function useDataContext() {
  return useContext(DataContext);
}

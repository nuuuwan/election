

import { Cache, Ent, EntType, Timer } from "..";
import { CustomURLContext, DerivedData, Election } from "..";
import { GROUP_ID_TO_PD_ID_LIST } from "..";



export default class DataProviderUtils {
  static async getEntValuesNoCache() {
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
  
  static async getEntValues() {
    return await Cache.get("getEntValues", DataProviderUtils.getEntValuesNoCache);
  }

    static async  getElectionValues({
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

  
static async getValue(state) {
  const entValues = await DataProviderUtils.getEntValues();

  const {
    election,
    activeEntIDDerived,
    nResultsDisplayDerived,
    electionDisplay,
  } = await DataProviderUtils.getElectionValues(state);

  const entIdx = election.getEntIdx(entValues);

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
    { entIdx }
  );
}
}


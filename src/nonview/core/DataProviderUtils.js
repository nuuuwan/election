import {
  Ent,
  EntType,
  Timer,
  CustomURLContext,
  DerivedData,
  Election,
  GROUP_ID_TO_PD_ID_LIST,
} from '..';

export default class DataProviderUtils {
  static async getEntValues() {
    const inner = async function () {
      const pdIdx = await Ent.idxFromType(EntType.PD);
      const edIdx = await Ent.idxFromType(EntType.ED);
      const provinceIdx = await Ent.idxFromType(EntType.PROVINCE);
      const ezIdx = Object.fromEntries(
        Object.keys(GROUP_ID_TO_PD_ID_LIST).map(function (ezID) {
          return [ezID, new Ent({ id: ezID, name: ezID })];
        }),
      );

      const allRegionIdx = Object.assign(
        { LK: Ent.LK },
        pdIdx,
        edIdx,
        provinceIdx,
        ezIdx,
      );

      return { pdIdx, edIdx, provinceIdx, ezIdx, allRegionIdx };
    };

    return await Timer.logAsync('DataProviderUtils.getEntValues', 100, inner);
  }

  static async getElectionValues({
    electionType,
    date,
    activeEntID,
    nResultsDisplay,
  }) {
    const inner = async function () {
      const election = await Election.fromElectionTypeAndDate(
        electionType,
        date,
      );

      const activeEntIDDerived = DerivedData.getActiveEntID(
        activeEntID,
        nResultsDisplay,
        election,
      );
      const nResultsDisplayDerived = DerivedData.getNResultsDisplay(
        activeEntID,
        nResultsDisplay,
        election,
      );

      const electionDisplay = election.getElectionSubset(
        nResultsDisplayDerived,
      );

      return {
        election,
        activeEntIDDerived,
        nResultsDisplayDerived,
        electionDisplay,
      };
    };
    return await Timer.logAsync(
      'DataProviderUtils.getElectionValues',
      100,
      inner,
    );
  }

  static async getValue(state) {
    const inner = async function () {
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
        { entIdx },
      );
    };
    return await Timer.logAsync('DataProviderUtils.getValue', 100, inner);
  }
}

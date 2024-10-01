import { Bellwether } from "../../../nonview";

export default class AggregatedResultUtils {
  static getLatestEntIDList(data) {
    const N_LATEST = 10;
    const { electionDisplay } = data;
    const latestResultList = electionDisplay.baseResultList
      .slice()
      .reverse()
      .slice(0, N_LATEST);
    return latestResultList.map((result) => result.entID);
  }

  static getProvinceEntIDList(data) {
    return Object.keys(data.provinceIdx);
  }

  static getElectoralDistrictEntIDList(data) {
    return Object.keys(data.edIdx);
  }

  static getEthnicityEntIDList(data) {
    return Object.keys(data.ezIdx);
  }

  static getBellwetherEntIDList(data) {
    const { elections, electionDisplay, entIdx } = data;
    const infoList = Bellwether.getBestBellwetherInfoList(
      elections,
      electionDisplay,
      entIdx
    );

    return infoList
      .filter(function (info) {
        return (
          info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
        );
      })
      .slice(0, 10)
      .map((x) => x.entID);
  }

  static getGroupToEntIDListGetter() {
    const me = AggregatedResultUtils;
    return {
      Provinces: me.getProvinceEntIDList,
      "Electoral Districts": me.getElectoralDistrictEntIDList,
      "Latest Results": me.getLatestEntIDList,
      Ethnicity: me.getEthnicityEntIDList,
      Bellwethers: me.getBellwetherEntIDList,
    };
  }
}

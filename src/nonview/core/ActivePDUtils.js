import { EntType } from "../base";

export default class ActivePDUtils {
  static getNewActivePDIDForED({ resultList, pdIdx, entID }) {
    for (let result of resultList.reverse()) {
      const pdEnt = pdIdx[result.entID];
      if (pdEnt && pdEnt.d.ed_id === entID) {
        return result.entID;
      }
    }
    return null;
  }

  static getNewActivePDIDForProvince({ resultList, pdIdx, entID }) {
    for (let result of resultList.reverse()) {
      const pdEnt = pdIdx[result.entID];
      if (pdEnt && pdEnt.d.province_id === entID) {
        return result.entID;
      }
    }
    return null;
  }

  static getNewActivePDID({ resultList, pdIdx, entID }) {
    const entType = EntType.fromID(entID);

    switch (entType) {
      case EntType.PD:
        return entID;
      case EntType.ED:
        return ActivePDUtils.getNewActivePDIDForED({
          resultList,
          pdIdx,
          entID,
        });
      case EntType.PROVINCE:
        return ActivePDUtils.getNewActivePDIDForProvince({
          resultList,
          pdIdx,
          entID,
        });
      default:
        return null;
    }
  }
}

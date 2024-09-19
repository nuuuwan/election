import { EntType, ProvinceUtils } from "../base";

export default class ActivePDUtils {
  static getNewActiveEntIDForED({ pdResultList, pdIdx, entID }) {
    for (let result of pdResultList.reverse()) {
      const pdEnt = pdIdx[result.entID];
      if (pdEnt && pdEnt.d.ed_id === entID) {
        return result.entID;
      }
    }
    return null;
  }

  static getNewActiveEntIDForProvince({ pdResultList, pdIdx, entID }) {
    for (let result of pdResultList.reverse()) {
      const pdEnt = pdIdx[result.entID];
      if (ProvinceUtils.getProvinceIDForPDEnt(pdEnt) === entID) {
        return result.entID;
      }
    }
    return null;
  }

  static getNewActiveEntID({ pdResultList, pdIdx, entID }) {
    const entType = EntType.fromID(entID);

    switch (entType) {
      case EntType.PD:
        return entID;
      case EntType.ED:
        return ActivePDUtils.getNewActiveEntIDForED({
          pdResultList,
          pdIdx,
          entID,
        });
      case EntType.PROVINCE:
        return ActivePDUtils.getNewActiveEntIDForProvince({
          pdResultList,
          pdIdx,
          entID,
        });
      default:
        return null;
    }
  }
}

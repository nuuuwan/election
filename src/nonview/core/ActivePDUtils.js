import { EntType } from '..';

export default class ActivePDUtils {
  static getNewActiveEntIDForED({ baseResultList, entIdx, entID }) {
    for (const result of baseResultList.reverse()) {
      const ent = entIdx[result.entID];
      if (ent && ent.d.ed_id === entID) {
        return result.entID;
      }

      if (ent.id === entID) {
        return result.entID;
      }
    }
    return null;
  }

  static getNewActiveEntIDForProvince({ baseResultList, entIdx, entID }) {
    for (const result of baseResultList.reverse()) {
      const ent = entIdx[result.entID];
      if (ent.d.province_id === entID) {
        return result.entID;
      }
    }
    return null;
  }

  static getNewActiveEntID({ baseResultList, entIdx, entID }) {
    const entType = EntType.fromID(entID);
    return {
      [EntType.PD]: entID,
      [EntType.ED]: ActivePDUtils.getNewActiveEntIDForED({
        baseResultList,
        entIdx,
        entID,
      }),
      [EntType.PROVINCE]: ActivePDUtils.getNewActiveEntIDForProvince({
        baseResultList,
        entIdx,
        entID,
      }),
    }[entType];
  }
}

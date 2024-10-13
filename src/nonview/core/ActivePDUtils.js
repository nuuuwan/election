import { EntType, ProvinceUtils } from "..";

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
            if (ProvinceUtils.getProvinceIDForPDEnt(ent) === entID) {
                return result.entID;
            }
            if (ProvinceUtils.getProvinceIDForEDID(ent.id) === entID) {
                return result.entID;
            }
        }
        return null;
    }

    static getNewActiveEntID({ baseResultList, entIdx, entID }) {
        const entType = EntType.fromID(entID);

        switch (entType) {
        case EntType.PD:
            return entID;
        case EntType.ED:
            return ActivePDUtils.getNewActiveEntIDForED({
                baseResultList,
                entIdx,
                entID,
            });
        case EntType.PROVINCE:
            return ActivePDUtils.getNewActiveEntIDForProvince({
                baseResultList,
                entIdx,
                entID,
            });
        default:
            return null;
        }
    }
}

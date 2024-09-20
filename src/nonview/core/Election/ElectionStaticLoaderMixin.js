import Result from "../Result.js";
import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";
import PD_ID_TO_GROUP_ID from "../../constants/PD_ID_TO_GROUP_ID.js";
import ED_ID_TO_GROUP_ID from "../../constants/ED_ID_TO_GROUP_ID.js";

const ElectionStaticLoaderMixin = {
  buildResultIdx(resultList) {
    return Object.fromEntries(
      resultList.map((result) => [result.entID, result])
    );
  },

  buildParentResultList(parentIDToChildResultList) {
    return Object.entries(parentIDToChildResultList).map(function ([
      parentID,
      childResultList,
    ]) {
      return Result.fromList(parentID, childResultList);
    });
  },

  buildEDResultList(pdResultList) {
    const edIDToResultList = pdResultList.reduce(function (
      edIDToResultList,
      pdResult
    ) {
      const pdID = pdResult.entID;
      const edID = pdID.substring(0, 5);
      if (!edIDToResultList[edID]) {
        edIDToResultList[edID] = [];
      }
      edIDToResultList[edID].push(pdResult);
      return edIDToResultList;
    },
    {});
    return ElectionStaticLoaderMixin.buildParentResultList(edIDToResultList);
  },

  buildEZResultList(baseResultList) {
    const ezIDToResultList = baseResultList.reduce(function (
      ezIDToResultList,
      baseEntResult,
    ) {
      const baseEntID = baseEntResult.entID;
      const ezID = PD_ID_TO_GROUP_ID[baseEntID] || ED_ID_TO_GROUP_ID[baseEntID];

      if (!ezIDToResultList[ezID]) {
        ezIDToResultList[ezID] = [];
      }
      ezIDToResultList[ezID].push(baseEntResult);
      return ezIDToResultList;
    },
    {});
    return ElectionStaticLoaderMixin.buildParentResultList(ezIDToResultList);
  },

  buildProvinceResultList(edResultList) {
    const provinceIDToResultList = edResultList.reduce(function (
      provinceIDToResultList,
      edResult
    ) {
      const edID = edResult.entID;
      const provinceID = ElectionStaticUtilsMixin.getProvinceID(edID);
      if (!provinceIDToResultList[provinceID]) {
        provinceIDToResultList[provinceID] = [];
      }
      provinceIDToResultList[provinceID].push(edResult);
      return provinceIDToResultList;
    },
    {});
    return ElectionStaticLoaderMixin.buildParentResultList(
      provinceIDToResultList
    );
  },

  buildResultLK(childResultList) {
    return Result.fromList("LK", childResultList);
  },
};

export default ElectionStaticLoaderMixin;

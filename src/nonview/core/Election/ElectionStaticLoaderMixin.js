import Result from "../Result.js";
import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";

const ElectionStaticLoaderMixin = {
  buildResultIdx(resultList) {
    return Object.fromEntries(
      resultList.map((result) => [result.entID, result])
    );
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
    const edResultList = Object.entries(edIDToResultList).map(function ([
      edID,
      resultListForED,
    ]) {
      return Result.fromList(edID, resultListForED);
    });
    return edResultList;
  },

  buildProvinceResultList(pdResultList) {
    const provinceIDToResultList = pdResultList.reduce(function (
      provinceIDToResultList,
      pdResult
    ) {
      const pdID = pdResult.entID;
      const edID = pdID.substring(0, 5);
      const provinceID = ElectionStaticUtilsMixin.getProvinceID(edID);
      if (!provinceIDToResultList[provinceID]) {
        provinceIDToResultList[provinceID] = [];
      }
      provinceIDToResultList[provinceID].push(pdResult);
      return provinceIDToResultList;
    },
    {});
    const edResultList = Object.entries(provinceIDToResultList).map(function ([
      edID,
      resultListForED,
    ]) {
      return Result.fromList(edID, resultListForED);
    });
    return edResultList;
  },

  buildLKResult(pdResultList) {
    return Result.fromList("LK", pdResultList);
  },

  expand(pdResultList) {
    const edResultList =
      ElectionStaticLoaderMixin.buildEDResultList(pdResultList);
    const provinceResultList =
      ElectionStaticLoaderMixin.buildProvinceResultList(pdResultList);
    const lkResult = ElectionStaticLoaderMixin.buildLKResult(pdResultList);
    return [lkResult, ...provinceResultList, ...edResultList, ...pdResultList];
  },
};

export default ElectionStaticLoaderMixin;

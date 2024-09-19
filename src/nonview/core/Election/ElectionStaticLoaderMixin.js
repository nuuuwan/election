import Result from "../Result.js";
import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";
import PD_ID_TO_GROUP_ID from "../../constants/PD_ID_TO_GROUP_ID.js";

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

  buildEZResultList(pdResultList) {
    const ezIDToResultList = pdResultList.reduce(function (
      ezIDToResultList,
      pdResult
    ) {
      const pdID = pdResult.entID;
      const ezID = PD_ID_TO_GROUP_ID[pdID];

      if (!ezIDToResultList[ezID]) {
        ezIDToResultList[ezID] = [];
      }
      ezIDToResultList[ezID].push(pdResult);
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
    return ElectionStaticLoaderMixin.buildParentResultList(provinceIDToResultList);
  },

  buildResultLK(childResultList) {
    return Result.fromList("LK", childResultList);
  },

  expand(pdResultList) {
    const edResultList =
      ElectionStaticLoaderMixin.buildEDResultList(pdResultList);
    const provinceResultList =
      ElectionStaticLoaderMixin.buildProvinceResultList(edResultList);
    const resultLK = ElectionStaticLoaderMixin.buildResultLK(provinceResultList);

    const ezResultList =
      ElectionStaticLoaderMixin.buildEZResultList(pdResultList);

    return {
      edResultList,
      provinceResultList,
      ezResultList,
      resultLK,
    };
  },
};

export default ElectionStaticLoaderMixin;

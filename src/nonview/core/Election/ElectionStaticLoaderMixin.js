
import Result from "../Result.js";
import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";


const ElectionStaticLoadedMixin = {
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
      }
    
      
    , buildProvinceResultList(pdResultList) {
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
      }
    
      , buildLKResult(pdResultList) {
        return Result.fromList("LK", pdResultList);
      }
    
      , expand(pdResultList) {
        const edResultList = ElectionStaticLoadedMixin.buildEDResultList(pdResultList);
        const provinceResultList = ElectionStaticLoadedMixin.buildProvinceResultList(pdResultList);
        const lkResult = ElectionStaticLoadedMixin.buildLKResult(pdResultList);
        return [lkResult, ...provinceResultList, ...edResultList, ...pdResultList];
      },
}

export default ElectionStaticLoadedMixin;
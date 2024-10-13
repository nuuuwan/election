import { MathX, MLModel } from "../..";
import FeatureMatrix from "./FeatureMatrix";

export default class ElectionModelUtils {
  static ERROR_CONF = 0.8;
  static MIN_P = 0.01;
  
  static getPError(Y, YHat) {
    
    const pErrorList = YHat.reduce(function (pErrorList, YHati, i) {
      return YHati.reduce(function (pErrorList, YHatij, j) {
        const y = Y.get(i, j);
        if (y >= ElectionModelUtils.MIN_P) {
          const YHatijNorm = MathX.forceRange(YHatij, 0, 1);
          const error = Math.sqrt(Math.pow(YHatijNorm - y, 2)) / y;
          pErrorList.push(error);
        }
        return pErrorList;
      }, pErrorList);
    }, []).sort();
    const n = pErrorList.length;
    const iLimit = Math.floor(ElectionModelUtils.ERROR_CONF * n);
    const error = pErrorList[iLimit];
    return error;
  }

  static getTrainEvaluateData(XAll, YAll) {
    const XTrainEvaluate = XAll.slice(0, -1);
    const YTrainEvaluate = YAll.slice(0, -1);
    return { XTrainEvaluate, YTrainEvaluate };
  }

  static getTestEvaluateData(XAll, YAll) {
    const XTestEvaluate = XAll.slice(-1);
    const YTestEvaluate = YAll.slice(-1);
    return { XTestEvaluate, YTestEvaluate };
  }

  static trainModelEvaluate(XAll, YAll) {
    const { XTrainEvaluate, YTrainEvaluate } =
      ElectionModelUtils.getTrainEvaluateData(XAll, YAll);
    return MLModel.train(XTrainEvaluate, YTrainEvaluate);
  }

  static getPErrorByHoldout(XAll, YAll) {
    // Evaluate Error
    const modelEvaluate = ElectionModelUtils.trainModelEvaluate(XAll, YAll);
    const { XTestEvaluate, YTestEvaluate } =
      ElectionModelUtils.getTestEvaluateData(XAll, YAll);
    const YHatTestEvaluate = new FeatureMatrix(
      XTestEvaluate.map((Xi) => modelEvaluate.predict(Xi))
    );
    return ElectionModelUtils.getPError(YTestEvaluate, YHatTestEvaluate);
  }

  static trainModel(XAll, YAll) {
    return MLModel.train(XAll, YAll);
  }
}

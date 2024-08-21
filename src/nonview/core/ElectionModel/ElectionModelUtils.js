import { MLModel } from "../../base";

import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";

export default class ElectionModelUtils {
  static MIN_RESULTS_FOR_PREDICTION = 1;
  static ERROR_CONF = 0.7;
  static DEFAULT_P_ERROR = 0.2;

  static getPError(Y, yHat) {
    const MIN_P = 0.01;
    const pErrorList = yHat
      .reduce(function (pErrorList, YHat, i) {
        return YHat.reduce(function (pErrorList, yHat, j) {
          const y = Y[i][j];
          if (y >= MIN_P) {
            const error = Math.sqrt(Math.pow(yHat - y, 2)) / y;
            pErrorList.push(error);
          }
          return pErrorList;
        }, pErrorList);
      }, [])
      .sort();

    const n = pErrorList.length;
    return pErrorList[Math.floor(ElectionModelUtils.ERROR_CONF * n)];
  }

  static getPErrorEvaluate(XAll, YAll) {
    // Evaluate Error
    const XTrainEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      XAll.slice(0, -1)
    );
    const YTrainEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      YAll.slice(0, -1)
    );
    const canTrainModelEvaluate =
      XTrainEvaluate.length >= ElectionModelUtils.MIN_RESULTS_FOR_PREDICTION;

    let modelEvaluate = null;
    if (canTrainModelEvaluate) {
      modelEvaluate = new MLModel(XTrainEvaluate, YTrainEvaluate);
    }
    const XTestEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      XAll.slice(-1)
    );
    const YTestEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      YAll.slice(-1)
    );

    let YHatTestEvaluate = [];
    let pError = ElectionModelUtils.DEFAULT_P_ERROR;
    if (canTrainModelEvaluate) {
      YHatTestEvaluate = XTestEvaluate.map((Xi) => modelEvaluate.predict(Xi));
      pError = ElectionModelUtils.getPError(YTestEvaluate, YHatTestEvaluate);
    }
    return pError;
  }

  static trainModel(XAll, YAll) {
    const XTrain = ElectionModelFeatureUtils.concatFeatureMatrixList(XAll);
    const YTrain = ElectionModelFeatureUtils.concatFeatureMatrixList(YAll);
    const canTrainModel =
      XTrain.length >= ElectionModelUtils.MIN_RESULTS_FOR_PREDICTION;
    if (!canTrainModel) {
      return null;
    }
    return new MLModel(XTrain, YTrain);
  }
}

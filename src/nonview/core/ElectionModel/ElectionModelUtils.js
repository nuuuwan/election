import { MLModel } from "../..";

import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";

export default class ElectionModelUtils {
  static ERROR_CONF = 0.8;
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

  static getTrainEvaluateData(XAll, YAll) {
    const XTrainEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      XAll.slice(0, -1)
    );
    const YTrainEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      YAll.slice(0, -1)
    );
    return { XTrainEvaluate, YTrainEvaluate };
  }

  static getTestEvaluateData(XAll, YAll) {
    const XTestEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      XAll.slice(-1)
    );
    const YTestEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      YAll.slice(-1)
    );
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
    if (!modelEvaluate) {
      return ElectionModelUtils.DEFAULT_P_ERROR;
    }

    const { XTestEvaluate, YTestEvaluate } =
      ElectionModelUtils.getTestEvaluateData(XAll, YAll);
    const YHatTestEvaluate = XTestEvaluate.map((Xi) =>
      modelEvaluate.predict(Xi)
    );
    return ElectionModelUtils.getPError(YTestEvaluate, YHatTestEvaluate);
  }

  static getTrainData(XAll, YAll) {
    const XTrain = ElectionModelFeatureUtils.concatFeatureMatrixList(XAll);
    const YTrain = ElectionModelFeatureUtils.concatFeatureMatrixList(YAll);
    return { XTrain, YTrain };
  }

  static trainModel(XAll, YAll) {
    const { XTrain, YTrain } = ElectionModelUtils.getTrainData(XAll, YAll);
    return MLModel.train(XTrain, YTrain);
  }
}

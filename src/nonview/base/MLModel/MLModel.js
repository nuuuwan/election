import MLR from "ml-regression-multivariate-linear";

export default class MLModel {
  static MIN_RESULTS_FOR_PREDICTION = 1;

  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
    this.mlr = new MLR(X.floatListList, Y.floatListList);
  }

  static train(X, Y) {
    if (X.length < MLModel.MIN_RESULTS_FOR_PREDICTION) {
      return null;
    }
    return new MLModel(X, Y);
  }

  predict(Xi) {
    return this.mlr.predict(Xi.floatList);
  }
}

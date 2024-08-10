import MLR from "ml-regression-multivariate-linear";

export default class MLModel {
  constructor(X, Y) {
    this.X = X;
    this.Y = Y;
    this.mlr = new MLR(X, Y);
  }

  predict(Xi) {
    return this.mlr.predict(Xi);
  }
}

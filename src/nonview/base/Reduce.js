export default class Reduce {
  static double(initValue, arr1, arr2, func) {
    return arr1.reduce(function (value, arr1Item, i) {
      return arr2.reduce(function (value, arr2Item, j) {
        return func(value, arr1Item, arr2Item, i, j);
      }, value);
    }, initValue);
  }
}

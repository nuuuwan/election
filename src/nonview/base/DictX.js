export default class DictX {
  static convertAIDToBIDListToBIDToAID(aIDToBIDList) {
    return Object.entries(aIDToBIDList).reduce(function (idx, [aID, bIDList]) {
      return bIDList.reduce(function (idx, bID) {
        idx[bID] = aID;
        return idx;
      }, idx);
    }, {});
  }

  static sort(dict, lambda = undefined) {
    lambda = lambda || ((a) => -a[1]);

    let entries = Object.entries(dict).sort(function (a, b) {
      return lambda(a) - lambda(b);
    });
    return Object.fromEntries(entries);
  }
}

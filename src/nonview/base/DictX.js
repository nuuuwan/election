export default class DictX {
  static convertAIDToBIDListToBIDToAID(aIDToBIDList) {
    return Object.entries(aIDToBIDList).reduce(function (idx, [aID, bIDList]) {
      return bIDList.reduce(function (idx, bID) {
        idx[bID] = aID;
        return idx;
      }, idx);
    }, {});
  }

  static sortByValue(dict, reverse = false) {
    let entries = Object.entries(dict).sort(function (a, b) {
      return a[1] - b[1];
    });
    if (reverse) {
      entries = entries.reverse();
    }
    return Object.fromEntries(entries);
  }
}

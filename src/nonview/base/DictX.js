export default class DictX {
  static convertAIDToBIDListToBIDToAID(aIDToBIDList) {
    return Object.entries(aIDToBIDList).reduce(function (idx, [aID, bIDList]) {
      return bIDList.reduce(function (idx, bID) {
        idx[bID] = aID;
        return idx;
      }, idx);
    }, {});
  }
}

export default class FeatureVector {
  constructor(floatList) {
    this.floatList = floatList;
  }

  get length() {
    return this.floatList.length;
  }

  map(callback) {
    return this.floatList.map((float, i) => callback(float, i, this.floatList));
  }

  reduce(callback, initialValue) {
    return this.floatList.reduce(
      (accumulator, float, i) =>
        callback(accumulator, float, i, this.floatList),
      initialValue
    );
  }

  static buildFromElectionAndParty(election, partyID, baseEntIDList) {
    return new FeatureVector(
      baseEntIDList.map(function (entID) {
        const baseResult = election.getResult(entID);
        if (!baseResult) {
          return 0.0;
        }
        return baseResult.partyToVotes.partyToPVotesSorted[partyID] || 0.0;
      })
    );
  }
}

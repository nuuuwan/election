import ElectionModelNormalizeUtils from "./ElectionModelNormalizeUtils";
import FeatureMatrix from "./FeatureMatrix";

export default class ElectionModelProjectionUtils {
  static getPDToPartyToPVotes(
    model,
    currentElection,
    XEvaluate,
    nonReleasedEntIDList
  ) {
    let YHat = [];
    if (model) {
      YHat = new FeatureMatrix(XEvaluate.map((Xi) => model.predict(Xi)));
    }
    const partyIDList = currentElection.getPartyIDList();
    const entToPartyToPVotes = YHat.reduce(function (
      entToPartyToPVotes,
      Yi,
      i
    ) {
      const partyID = partyIDList[i];
      return Yi.reduce(function (entToPartyToPVotes, pVotes, j) {
        const entID = nonReleasedEntIDList[j];
        if (!entToPartyToPVotes[entID]) {
          entToPartyToPVotes[entID] = {};
        }
        entToPartyToPVotes[entID][partyID] = pVotes;
        return entToPartyToPVotes;
      }, entToPartyToPVotes);
    },
    {});
    const normEntToPartyToPVotes =
      ElectionModelNormalizeUtils.normalize(entToPartyToPVotes);
    return normEntToPartyToPVotes;
  }
}

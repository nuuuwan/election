import ElectionModelNormalizeUtils from "./ElectionModelNormalizeUtils";

export default class ElectionModelProjectionUtils {
  static getPDToPartyToPVotes(
    model,
    currentElection,
    XEvaluate,
    nonReleasedEntIDList
  ) {
    let YHat = [];
    if (model) {
      YHat = XEvaluate.map((Xi) => model.predict(Xi));
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

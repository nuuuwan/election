import { MathX } from "../../base";

export default class ElectionModelNormalizeUtils {
    static normalizeSingle(partyToPVotes) {
        const totalPVotes = MathX.sumValues(partyToPVotes);
        return Object.fromEntries(
          Object.entries(partyToPVotes).map(function ([partyID, pVotes]) {
            return [partyID, pVotes / totalPVotes];
          })
        );
      }
    
      static normalize(pdToPartyToVoteInfo) {
        return Object.fromEntries(
          Object.entries(pdToPartyToVoteInfo).map(function ([
            pdID,
            partyToVoteInfo,
          ]) {
            return [pdID, ElectionModelNormalizeUtils.normalizeSingle(partyToVoteInfo)];
          })
        );
      }
}
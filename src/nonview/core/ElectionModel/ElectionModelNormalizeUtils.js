import { MathX } from '../..';

export default class ElectionModelNormalizeUtils {
  static normalizeSingle(partyToPVotes) {
    const partyToPVotesRanged = Object.fromEntries(
      Object.entries(partyToPVotes).map(function ([partyID, pVotes]) {
        return [partyID, MathX.forceRange(pVotes, 0, 1)];
      }),
    );

    const totalPVotes = MathX.sumValues(partyToPVotesRanged);
    return Object.fromEntries(
      Object.entries(partyToPVotesRanged).map(function ([partyID, pVotes]) {
        return [partyID, pVotes / totalPVotes];
      }),
    );
  }

  static normalize(pdToPartyToVoteInfo) {
    return Object.fromEntries(
      Object.entries(pdToPartyToVoteInfo).map(function ([
        pdID,
        partyToVoteInfo,
      ]) {
        return [
          pdID,
          ElectionModelNormalizeUtils.normalizeSingle(partyToVoteInfo),
        ];
      }),
    );
  }
}

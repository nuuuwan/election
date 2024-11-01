import { Party } from '../..';
import DictX from '../../base/DictX';
import MathX from '../../base/MathX';

export default class SeatsUtilsCompute {
  static getFilteredPartyToVotes(partyToVotes, pLimit) {
    const totalVotes = partyToVotes.totalVotes;
    const voteLimit = totalVotes * pLimit;
    return DictX.filter(
      partyToVotes.partyToVotes,
      (entry) => entry[1] >= voteLimit,
    );
  }

  static getPartyToSeatsFloat(partyToVotes, nSeats) {
    const filteredTotalVotes = MathX.sum(Object.values(partyToVotes));

    return DictX.filter(
      DictX.map(partyToVotes, ([partyID, votes]) => [
        partyID,
        (nSeats * votes) / filteredTotalVotes,
      ]),
      ([partyID, seats]) => !Party.fromID(partyID).isNonParty && seats > 0,
    );
  }

  static getPartyToSeatsInt(partyToSeatsFloat) {
    return Object.fromEntries(
      Object.entries(partyToSeatsFloat)
        .map(([partyID, seatsFloat]) => [partyID, parseInt(seatsFloat)])
        .filter((entry) => entry[1] > 0),
    );
  }

  static getPartyToRemSeatsFloat(partyToSeatsFloat) {
    return Object.fromEntries(
      Object.entries(partyToSeatsFloat).map(([partyID, seatsFloat]) => [
        partyID,
        seatsFloat - parseInt(seatsFloat),
      ]),
    );
  }

  static getPartyToSeatsRem(partyToRemSeatsFloat, nSeatsRem) {
    return Object.entries(partyToRemSeatsFloat)
      .sort((a, b) => b[1] - a[1])
      .slice(0, nSeatsRem)
      .reduce((acc, entry) => {
        acc[entry[0]] = 1;
        return acc;
      }, {});
  }

  static getPartyToSeatsBonus(partyToVotes, nSeatsBonus) {
    const winningPartyID = partyToVotes.winningPartyID;
    return { [winningPartyID]: nSeatsBonus };
  }
}

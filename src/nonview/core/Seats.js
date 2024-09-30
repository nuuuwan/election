import MathX from "../base/MathX.js";
import YEAR_TO_REGION_TO_SEATS from "../constants/YEAR_TO_REGION_TO_SEATS.js";
import Party from "./Party.js";

export default class Seats {
  static MIN_SEATS_FOR_DISPLAY = 5;

  constructor(election) {
    this.election = election;
  }

  toString() {
    return JSON.stringify({
      parts: this.regionToPartyToSeats,
      all: this.partyToSeats,
    });
  }

  get year() {
    return this.election.year;
  }

  get regionToSeats() {
    return YEAR_TO_REGION_TO_SEATS[this.year];
  }

  get regionToPartyToSeats() {
    let idx = this.election.edResultList.reduce(
      function (idx, result) {
        const entID = result.entID;
        const nSeatsAll = this.regionToSeats[entID];
        const partyToSeats = Seats.getGenericPartyToSeats(
          result,
          nSeatsAll,
          1,
          0.05
        );
        idx[entID] = partyToSeats;
        return idx;
      }.bind(this),
      {}
    );

    idx["LK"] = Seats.getGenericPartyToSeats(
      this.election.resultLK,
      this.regionToSeats["LK"],
      0,
      0
    );
    return idx;
  }

  get partyToSeats() {
    const unsorted = Object.values(this.regionToPartyToSeats).reduce(function (
      idx,
      partyToSeats
    ) {
      return Object.entries(partyToSeats).reduce(function (
        idx,
        [partyID, seats]
      ) {
        idx[partyID] = (idx[partyID] || 0) + seats;
        return idx;
      },
      idx);
    },
    {});
    return Object.fromEntries(
      Object.entries(unsorted).sort(
        ([partyID1, seats1], [partyID2, seats2]) => seats2 - seats1
      )
    );
  }

  get partyToSeatsMain() {
    const partyToSeats = this.partyToSeats;
    return Object.fromEntries(
      Object.entries(partyToSeats).filter(
        ([partyID, seats]) =>
          seats > Seats.MIN_SEATS_FOR_DISPLAY && partyID !== Party.ERROR.id
      )
    );
  }

  get partyToUFG() {
    return Object.values(this.regionToPartyToSeats).reduce(function (
      idx,
      partyToSeats
    ) {
      const seatsUFG = partyToSeats[Party.ERROR.id] || 0;
      if (seatsUFG === 0) {
        return idx;
      }
      return Object.entries(partyToSeats).reduce(function (
        idx,
        [partyID, seats]
      ) {
        idx[partyID] = (idx[partyID] || 0) + seatsUFG;
        return idx;
      },
      idx);
    },
    {});
  }

  static fromElection(election) {
    return new Seats(election);
  }

  static getGenericPartyToSeats(result, nSeatsAll, nSeatsBonus, pLimit) {
    const partyToVotes = result.partyToVotes.partyToVotes;
    const totalVotes = result.partyToVotes.totalVotes;
    const voteLimit = totalVotes * pLimit;
    const filteredPartyToVotes = Object.fromEntries(
      Object.entries(partyToVotes).filter(
        ([partyID, votes]) => votes >= voteLimit
      )
    );
    const filteredTotalVotes = MathX.sum(Object.values(filteredPartyToVotes));

    const nSeatsNonBonus = nSeatsAll - nSeatsBonus;
    const partyToSeatsF = Object.fromEntries(
      Object.entries(filteredPartyToVotes).map(([partyID, votes]) => [
        partyID,
        (nSeatsNonBonus * votes) / filteredTotalVotes,
      ])
    );

    let partyToSeats = Object.fromEntries(
      Object.entries(partyToSeatsF).map(([partyID, seatsF]) => [
        partyID,
        parseInt(seatsF),
      ])
    );
    const partyToSeatsR = Object.fromEntries(
      Object.entries(partyToSeatsF).map(([partyID, seatsF]) => [
        partyID,
        seatsF - partyToSeats[partyID],
      ])
    );

    const nSeatsI = MathX.sum(Object.values(partyToSeats));
    const nSeatsR = nSeatsNonBonus - nSeatsI;

    partyToSeats = Object.entries(partyToSeatsR)
      .sort(([partyID1, seatsR1], [partyID2, seatsR2]) => seatsR2 - seatsR1)
      .slice(0, nSeatsR)
      .reduce((acc, [partyID, seatsR]) => {
        acc[partyID] = acc[partyID] + 1;
        return acc;
      }, partyToSeats);

    const winningPartyID = result.partyToVotes.winningPartyID;
    partyToSeats[winningPartyID] += nSeatsBonus;

    return Object.fromEntries(
      Object.entries(partyToSeats)
        .filter(([partyID, seats]) => seats > 0)
        .sort(([partyID1, seats1], [partyID2, seats2]) => seats2 - seats1)
    );
  }
}

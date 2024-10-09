import EntType from "../../base/EntType.js";
import ProvinceUtils from "../../base/ProvinceUtils.js";
import YEAR_TO_REGION_TO_SEATS from "../../constants/YEAR_TO_REGION_TO_SEATS.js";
import Party from "../Party.js";
import SeatsUtils from "./SeatsUtils.js";

export default class Seats {
  static MIN_SEATS_FOR_DISPLAY = 10;

  constructor(election) {
    this.election = election;
    this.regionToSeats = YEAR_TO_REGION_TO_SEATS[this.year];
  }

  static fromElection(election) {
    return new Seats(election);
  }

  get edToPartyToSeats() {
    return this.election.edResultList
      .sort(function (result1, result2) {
        return result1.entID.localeCompare(result2.entID);
      })
      .reduce(
        function (idx, result) {
          const entID = result.entID;
          const nSeatsAll = this.regionToSeats[entID];
          const partyToSeats = SeatsUtils.getGenericPartyToSeats(
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
  }

  get lkPartyToSeats() {
    return SeatsUtils.getGenericPartyToSeats(
      this.election.resultLK,
      this.regionToSeats["LK"],
      0,
      0
    );
  }

  get regionToPartyToSeats() {
    return Object.assign({}, this.edToPartyToSeats, {
      LK: this.lkPartyToSeats,
    });
  }

  get totalPartyToSeats() {
    return SeatsUtils.aggregatePartyToSeats(
      Object.values(this.regionToPartyToSeats)
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

}

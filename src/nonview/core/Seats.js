import EntType from "../base/EntType.js";
import ProvinceUtils from "../base/ProvinceUtils.js";
import YEAR_TO_REGION_TO_SEATS from "../constants/YEAR_TO_REGION_TO_SEATS.js";
import Party from "./Party.js";
import SeatsUtils from "./SeatsUtils.js";

export default class Seats {
  static MIN_SEATS_FOR_DISPLAY = 10;

  constructor(election) {
    this.election = election;
  }

  static fromElection(election) {
    return new Seats(election);
  }

  get year() {
    return this.election.year;
  }

  get regionToSeats() {
    return YEAR_TO_REGION_TO_SEATS[this.year];
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

  static aggregatePartyToSeats(partyToSeatsList) {
    return partyToSeatsList.reduce(function (idx, partyToSeats) {
      return Object.entries(partyToSeats).reduce(function (
        idx,
        [partyID, seats]
      ) {
        idx[partyID] = (idx[partyID] || 0) + seats;
        return idx;
      },
      idx);
    }, {});
   
  }

  static sortPartyToSeats(unsorted) {
    return Object.fromEntries(
      Object.entries(unsorted).sort(function (
        [partyID1, seats1],
        [partyID2, seats2]
      ) {
        if (partyID1 === Party.ERROR.id) {
          return 1;
        }
        if (partyID2 === Party.ERROR.id) {
          return -1;
        }
        return seats2 - seats1;
      })
    );
  }

  get partyToSeats() {
    return Seats.aggregatePartyToSeats(
      Object.values(this.regionToPartyToSeats)
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

  getPartyToSeatsForProvince(provinceID) {
    const partyToSeatsList = Object.entries(this.regionToPartyToSeats)
      .filter(function ([entID, partyToSeats]) {
        if (entID === "LK") {
          return false;
        }
        const provinceID2 = ProvinceUtils.getProvinceIDForEDID(entID);
        return provinceID2 === provinceID;
      })
      .map(function ([entID, partyToSeats]) {
        return partyToSeats;
      });

    return Seats.aggregatePartyToSeats(partyToSeatsList);
  }

  getPartyToSeats(entID) {
    if (entID === "LK") {
      return this.partyToSeats;
    }
    if (EntType.fromID(entID) === EntType.ED) {
      return this.regionToPartyToSeats[entID];
    }

    if (EntType.fromID(entID) === EntType.PROVINCE) {
      return this.getPartyToSeatsForProvince(entID);
    }
    return null;
  }
}

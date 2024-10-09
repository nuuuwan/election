import EntType from "../../base/EntType.js";
import ProvinceUtils from "../../base/ProvinceUtils.js";
import YEAR_TO_REGION_TO_SEATS from "../../constants/YEAR_TO_REGION_TO_SEATS.js";
import SeatsUtils from "./SeatsUtils.js";
import SeatsBuilderMixin from "./SeatsBuilderMixin.js";

class Seats {
  static MIN_SEATS_FOR_DISPLAY = 10;

  constructor(election) {
    this.election = election;
    this.regionToSeats = YEAR_TO_REGION_TO_SEATS[election.year];
  }

  static fromElection(election) {
    return new Seats(election);
  }

  
  getPartyToSeatsForProvince(provinceID) {
    const partyToSeatsList = Object.entries(this.getRegionToPartyToSeats())
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

    return SeatsUtils.aggregatePartyToSeats(partyToSeatsList);
  }

  getPartyToSeats(entID) {
    if (entID === null) {
      return this.getTotalPartyToSeats();
    }
    if (entID === "LK") {
      return this.getLKPartyToSeats();
    }
    if (EntType.fromID(entID) === EntType.ED) {
      return this.getRegionToPartyToSeats()[entID];
    }

    if (EntType.fromID(entID) === EntType.PROVINCE) {
      return this.getPartyToSeatsForProvince(entID);
    }
    return null;
  }
}
Object.assign(Seats.prototype, SeatsBuilderMixin);
export default Seats
import EntType from '../../base/EntType.js';

import YEAR_TO_REGION_TO_SEATS from '../../constants/YEAR_TO_REGION_TO_SEATS.js';

import SeatsBuilderMixin from './SeatsBuilderMixin.js';

class Seats {
  static MIN_SEATS_FOR_DISPLAY = 10;

  constructor(election) {
    this.election = election;
    this.regionToSeats = YEAR_TO_REGION_TO_SEATS[election.year];
  }

  static fromElection(election) {
    return new Seats(election);
  }

  getPartyToSeats(entID) {
    if (entID === null) {
      return this.getTotalPartyToSeats();
    }
    if (entID === 'LK') {
      return this.getLKPartyToSeats();
    }
    if (EntType.fromID(entID) === EntType.ED) {
      return this.getRegionToPartyToSeats()[entID];
    }

    return null;
  }
}
Object.assign(Seats.prototype, SeatsBuilderMixin);
export default Seats;

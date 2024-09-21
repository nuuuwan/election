import { Party } from "../../nonview/core";
const normalCDF = require("@stdlib/stats-base-dists-normal-cdf");

export default class FinalOutcome {
  static P_BASE = 0.9;
  static P_TOO_MUCH_ERROR = 0.2;
  static MIN_N_RESULTS = 40;

  constructor(election, nResultsDisplay) {
    this.election = election;
    this.nResultsDisplay = nResultsDisplay;
  }

  get result() {
    return this.election.resultLK;
  }

  get pWinner() {
    return this.result.partyToVotes.pWinner || 0.0;
  }

  get pError() {
    return this.result.partyToVotes.partyToPVotesSorted[Party.ERROR.id] || 0.0;
  }

  get isTooEarlyToCall() {
    return this.nResultsDisplay <= FinalOutcome.MIN_N_RESULTS;
  }

  get isTooMuchError() {
    return this.pError > FinalOutcome.P_TOO_MUCH_ERROR;
  }

  get hasFirstPrefWinner() {
    return this.result.partyToVotes.pWinner > 0.5;
  }

  get likelyWinnerPartyInfoList() {
    const pError = this.pError;
    const likelyWinnerPartyInfoList = Object.entries(
      this.result.partyToVotes.partyToPVotesSorted
    )
      .filter(function ([partyID, pVotes]) {
        return pVotes + pError > 0.5 && partyID !== Party.ERROR.id;
      })
      .map(function ([partyID, pVotes]) {
        const missingPVotes = 0.5 - pVotes;

        const x = missingPVotes;
        const mean = pVotes * pError;
        const stdev = mean;
        const p = 1 - normalCDF(x, mean, stdev);

        return { partyID, p };
      });

    return likelyWinnerPartyInfoList;
  }
}

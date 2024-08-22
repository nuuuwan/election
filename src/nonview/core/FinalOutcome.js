import { Party } from "../../nonview/core";
const normalCDF = require("@stdlib/stats-base-dists-normal-cdf");

export default class FinalOutcome {
  static P_BASE = 0.9;
  static P_TOO_MUCH_UNCERTAINTY = 0.5;
  static MIN_N_RESULTS = 30;
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

  get pUncertain() {
    return (
      this.result.partyToVotes.partyToPVotesSorted[Party.UNCERTAIN.id] || 0.0
    );
  }

  get isTooEarlyToCall() {
    return this.nResultsDisplay <= FinalOutcome.MIN_N_RESULTS;
  }

  get isTooMuchUncertainty() {
    return this.pUncertain > FinalOutcome.P_TOO_MUCH_UNCERTAINTY;
  }

  get hasFirstPrefWinner() {
    return this.result.partyToVotes.pWinner > 0.5;
  }

  get likelyWinnerPartyInfoList() {
    const pUncertain = this.pUncertain;
    const likelyWinnerPartyInfoList = Object.entries(
      this.result.partyToVotes.partyToPVotesSorted
    )
      .filter(function ([partyID, pVotes]) {
        return pVotes + pUncertain > 0.5 && partyID !== Party.UNCERTAIN.id;
      })
      .map(function ([partyID, pVotes]) {
        const missingPVotes = 0.5 - pVotes;

        const x = missingPVotes;
        const mean = pVotes * pUncertain;
        const stdev = mean;
        const p = 1 - normalCDF(x, mean, stdev);

        return { partyID, p };
      });

    return likelyWinnerPartyInfoList;
  }
}

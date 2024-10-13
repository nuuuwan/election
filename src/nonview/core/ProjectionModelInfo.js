import Party from "./Party";


export default class ProjectionModelInfo {

  static MIN_N_RESULTS_DISPLAY = 30;
  static MIN_P_ERROR = 0.5;

  constructor(electionProjected, nResultsDisplay) {
    this.electionProjected = electionProjected;
    this.nResultsDisplay = nResultsDisplay;
  }

  get isTooEarly() {
    return this.nResultsDisplay < ProjectionModelInfo.MIN_N_RESULTS_DISPLAY;
  }

  get error() {
    const resultLK = this.electionProjected.resultLK;
    return resultLK.partyToVotes.partyToPVotesSorted[Party.ERROR.id];
  }

  get isTooMuchError() {
    return this.error > ProjectionModelInfo.MIN_P_ERROR;
  }
  
}

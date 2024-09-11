import Summary from "./Summary";
import PartyToVotes from "./PartyToVotes";


export default class Result {
  constructor(entID, summary, partyToVotes) {
    this.entID = entID;
    this.summary = summary;
    this.partyToVotes = partyToVotes;
  }

  static fromDict(d) {
    const entID = d["entity_id"];
    const summary = Summary.fromDict(d);
    const partyToVotes = PartyToVotes.fromDict(d);

    return new Result(entID, summary, partyToVotes);
  }

  static fromList(entID, resultList) {
    const summary = Summary.fromList(resultList);
    const partyToVotes = PartyToVotes.fromList(resultList);

    return new Result(entID, summary, partyToVotes);
  }

  get color() {
    return this.partyToVotes.color;
  }

  get winningPartyID() {
    return this.partyToVotes.winningPartyID;
  }

  get pWinner() {
    return this.partyToVotes.pWinner
  }
}

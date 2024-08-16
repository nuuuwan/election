import Summary from "./Summary";
import PartyToVotes from "./PartyToVotes";
import Party from "./Party";

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

  static fromList(entID, results) {
    const summary = Summary.fromList(results);
    const partyToVotes = PartyToVotes.fromList(results);

    return new Result(entID, summary, partyToVotes);
  }

  get winningPartyColor() {
    return Party.fromID(this.partyToVotes.winningPartyID).color;
  }
}

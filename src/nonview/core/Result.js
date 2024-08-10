import Summary from "./Summary";
import PartyToVotes from "./PartyToVotes";

export default class Result {
  constructor(entityID, summary, partyToVotes) {
    this.entityID = entityID;
    this.summary = summary;
    this.partyToVotes = partyToVotes;
  }

  static fromDict(d) {
    const entityID = d["entity_id"];
    const summary = Summary.fromDict(d);
    const partyToVotes = PartyToVotes.fromDict(d);

    return new Result(entityID, summary, partyToVotes);
  }

  static fromList(entityID, results) {
    const summary = Summary.fromList(results);
    const partyToVotes = PartyToVotes.fromList(results);

    return new Result(entityID, summary, partyToVotes);
  }
}

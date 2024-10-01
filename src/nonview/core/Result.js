import Summary from "./Summary";
import PartyToVotes from "./PartyToVotes";
import MathX from "../base/MathX";

export default class Result {
  constructor(entID, summary, partyToVotes, resultTime) {
    this.entID = entID;
    this.summary = summary;
    this.partyToVotes = partyToVotes;
    this.resultTime = resultTime;
  }

  static fromDict(d) {
    const entID = d["entity_id"];
    const partyToVotes = PartyToVotes.fromDict(d);

    // HACK
    let summary = Summary.fromDict(d);
    if (!summary.electors) {
      const valid = parseInt(
        MathX.sum(Object.values(partyToVotes.partyToVotes))
      );
      const rejected = parseInt(valid * 0.05);
      const polled = valid + rejected;
      const electors = parseInt(polled / 0.75);
      summary = new Summary(valid, rejected, polled, electors);
    }

    const resultTime = d["result_time"];

    return new Result(entID, summary, partyToVotes, resultTime);
  }

  static fromList(entID, resultList) {
    if (resultList.length === 0) {
      throw new Error("No resultList: " + entID);
    }

    const summary = Summary.fromList(resultList);
    const partyToVotes = PartyToVotes.fromList(resultList);
    const resultTime = resultList.sort(function (a, b) {
      const resultTimeA = a.resultTime || "";
      const resultTimeB = b.resultTime || "";
      return resultTimeA.localeCompare(resultTimeB);
    })[resultList.length - 1].resultTime;

    return new Result(entID, summary, partyToVotes, resultTime);
  }

  get color() {
    return this.partyToVotes.color;
  }

  get winningPartyID() {
    return this.partyToVotes.winningPartyID;
  }

  get pWinner() {
    return this.partyToVotes.pWinner;
  }
}

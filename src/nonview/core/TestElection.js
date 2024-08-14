import { MathX, Random } from "../base";
import Election from "./Election";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class TestElection {
  static getRandomSummary() {
    const [MIN_ELECTORS, MAX_ELECTORS] = [50_000, 150_000];
    const [MIN_TURNOUT, MAX_TURNOUT] = [0.65, 0.85];
    const [MIN_REJECT, MAX_REJECT] = [0.005, 0.015];

    const electors = Random.randomInt(MIN_ELECTORS, MAX_ELECTORS);
    const pTurnout = Random.randomFloat(MIN_TURNOUT, MAX_TURNOUT);
    const polled = Math.round(electors * pTurnout);
    const pRejected = Random.randomFloat(MIN_REJECT, MAX_REJECT);
    const rejected = Math.round(electors * pRejected);
    const valid = polled - rejected;
    return new Summary(electors, polled, valid, rejected);
  }

  static getRandomPartyToVotes(valid, partyToPVote) {
    const partyToQVotes = Object.fromEntries(
      Object.entries(partyToPVote).map(function ([partyID, pVote]) {
        const qVotes = Random.randomFloat(0, 1) * 0.2 * pVote;
        return [partyID, qVotes];
      })
    );
    const sumQVotes = MathX.sumValues(partyToQVotes);
    const partyToVotes = Object.fromEntries(
      Object.entries(partyToQVotes).map(function ([partyID, qVotes]) {
        const pVotes = qVotes / sumQVotes;
        const votes = Math.round(pVotes * valid);
        return [partyID, votes];
      })
    );
    return new PartyToVotes(partyToVotes);
  }

  static getRandomResult(pdID, partyIDList) {
    const summary = TestElection.getRandomSummary();
    const partyToVotes = TestElection.getRandomPartyToVotes(
      summary.valid,
      partyIDList
    );
    return new Result(pdID, summary, partyToVotes);
  }

  static getRandomPDResultsList(pdIDList, partyIDList, nResultsDisplay) {
    const randomPDIDList = Random.shuffle(pdIDList).slice(0, nResultsDisplay);

    return randomPDIDList.map(function (pdID) {
      return TestElection.getRandomResult(pdID, partyIDList);
    });
  }

  static random(pdIDList, electionType, date, partyToPVote, nResultsDisplay) {
    let election = new Election(electionType, date);
    const pdResultsList = TestElection.getRandomPDResultsList(
      pdIDList,
      partyToPVote,
      nResultsDisplay
    );
    const edResultsList = Election.buildEDResultsList(pdResultsList);
    const lkResult = Election.buildLKResult(pdResultsList);

    election.resultsList = [].concat(pdResultsList, edResultsList, [lkResult]);
    election.resultsIdx = Election.buildResultsIdx(election.resultsList);
    election.isLoaded = true;
    return election;
  }
}

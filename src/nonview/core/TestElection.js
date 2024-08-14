import { Ent, EntType, MathX, Random } from "../base";
import Election from "./Election";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class TestElection {
  static getPartyToPVote() {
    return {
      SJB: 0.43,
      NPP: 0.3 + 1,
      "Ind-R": 0.2,
      "SLPP-R": 0.07,
    };
  }

  static getRandomSummary() {
    const [MIN_ELECTORS, MAX_ELECTORS] = [50_000, 150_000];
    const [MIN_TURNOUT, MAX_TURNOUT] = [0.65, 0.85];
    const [MIN_REJECT, MAX_REJECT] = [0.005, 0.015];

    const electors = Random.randomInt(MIN_ELECTORS, MAX_ELECTORS);
    const pTurnout = Random.randomFloat(MIN_TURNOUT, MAX_TURNOUT);
    const polled = Math.round(electors * pTurnout);
    const pRejected = Random.randomFloat(MIN_REJECT, MAX_REJECT);
    const rejected = Math.round(polled * pRejected);
    const valid = polled - rejected;
    return new Summary(valid, rejected, polled, electors);
  }

  static getRandomPartyToVotes(valid, partyToPVote) {
    const P_NOISE = 0.1;
    const partyToQVotes = Object.fromEntries(
      Object.entries(partyToPVote).map(function ([partyID, pVote]) {
        const qVotes = Random.randomFloat(0, 1) * (pVote + P_NOISE);
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

  static getRandomPDResultsList(pdIDList, partyIDList) {
    const randomPDIDList = Random.shuffle(pdIDList);

    return randomPDIDList.map(function (pdID) {
      return TestElection.getRandomResult(pdID, partyIDList);
    });
  }

  static async loadData(election) {
    if (election.isLoaded) {
      throw new Error("Election is already loaded: " + election);
    }
    const pds = await Ent.listFromType(EntType.PD);
    const pdIDList = pds.map((pd) => pd.id);

    const partyToPVote = TestElection.getPartyToPVote();

    const pdResultsList = TestElection.getRandomPDResultsList(
      pdIDList,
      partyToPVote
    );
    const edResultsList = Election.buildEDResultsList(pdResultsList);
    const lkResult = Election.buildLKResult(pdResultsList);

    election.resultsList = [].concat(pdResultsList, edResultsList, [lkResult]);
    election.resultsIdx = Election.buildResultsIdx(election.resultsList);
    election.isLoaded = true;
    return election;
  }
}

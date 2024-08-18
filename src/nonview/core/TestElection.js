import { MathX } from "../base";
import { PRESPOLLSL2024 } from "../constants";
import Election from "./Election";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class TestElection {
  static getPDResult(data) {
    const summary = Summary.fromDict(data["summary"]);

    let subsetPartyToVotes = data["subset_party_to_votes"];
    const totalSubsetVotes = MathX.sumValues(subsetPartyToVotes);
    const otherVotes = summary.valid - totalSubsetVotes;
    subsetPartyToVotes["OTHERS"] = otherVotes;
    const partyToVotes = PartyToVotes.fromDict(subsetPartyToVotes);

    return new Result(data["pd_id"], summary, partyToVotes);
  }

  static gePDResultList() {
    return PRESPOLLSL2024.filter(function (data) {
      return data["result_time"] !== 0;
    })
      .sort(function (a, b) {
        return a["result_time"].localeCompare(b["result_time"]);
      })
      .map(function (data) {
        return TestElection.getPDResult(data);
      });
  }

  static async loadData(election) {
    if (election.isLoaded) {
      throw new Error("Election is already loaded: " + election);
    }

    const pdResultList = TestElection.gePDResultList();
    const edResultList = Election.buildEDResultList(pdResultList);
    const lkResult = Election.buildLKResult(pdResultList);

    election.resultList = [].concat(pdResultList, edResultList, [lkResult]);
    election.resultIdx = Election.buildResultsIdx(election.resultList);
    election.isLoaded = true;
    return election;
  }
}

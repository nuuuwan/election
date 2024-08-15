
import { MathX } from "../base";
import { PRESPOLLSL2024 } from "../constants";
import Election from "./Election";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class TestElection {




  static getPDResult(data) {
    const summary = Summary.fromDict(data['summary']);
   
    let subsetPartyToVotes = data['subset_party_to_votes'];
    const totalSubsetVotes = MathX.sumValues(subsetPartyToVotes);
    const otherVotes = summary.valid - totalSubsetVotes;
    subsetPartyToVotes['OTHERS'] = otherVotes;
    const partyToVotes = PartyToVotes.fromDict(subsetPartyToVotes);
    
    return new Result(
      data['pd_id'],
      summary,
      partyToVotes
    );
  }

  static gePDResultsList() {
    return PRESPOLLSL2024.map(
      function(data) {
        return TestElection.getPDResult(data);
      }
    )
  }

  static async loadData(election) {
    if (election.isLoaded) {
      throw new Error("Election is already loaded: " + election);
    }


    const pdResultsList = TestElection.gePDResultsList();
    const edResultsList = Election.buildEDResultsList(pdResultsList);
    const lkResult = Election.buildLKResult(pdResultsList);

    election.resultsList = [].concat(pdResultsList, edResultsList, [lkResult]);
    election.resultsIdx = Election.buildResultsIdx(election.resultsList);
    election.isLoaded = true;
    return election;
  }
}

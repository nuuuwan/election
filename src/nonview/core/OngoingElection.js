import { MathX, Time, WWW, Cache } from "../base";
import Election from "./Election";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class OngoingElection {
  static URL =
    "https://raw.githubusercontent.com/nuuuwan/prespollsl2024_py/main/data/prespollsl2024.json";
  static getPDResult(data) {
    const summary = Summary.fromDict(data["summary"]);

    let subsetPartyToVotes = data["subset_party_to_votes"];
    const totalSubsetVotes = MathX.sumValues(subsetPartyToVotes);
    const otherVotes = summary.valid - totalSubsetVotes;
    subsetPartyToVotes["OTHERS"] = otherVotes;
    const partyToVotes = PartyToVotes.fromDict(subsetPartyToVotes);

    return new Result(
      data["pd_id"],
      summary,
      partyToVotes,
      data["result_time"]
    );
  }

  static async getRawDataNoCache() {
    return await WWW.jsonNonCache(OngoingElection.URL);
  }

  static async getRawData() {
    const CACHE_DURATION_S = 60;
    const timeKey = CACHE_DURATION_S * parseInt(Time.now().ut / CACHE_DURATION_S);
    return await Cache.get(`OngoingElection.getRawData.${timeKey}`, OngoingElection.getRawDataNoCache);
  }
  
  static async getPDResultList() {
    const rawDataList = await OngoingElection.getRawData();
    return rawDataList
      .filter(function (data) {
        return data["result_time"] !== 0;
      })
      .sort(function (a, b) {
        return (a.resultTime || "").localeCompare(b.resultTime || "");
      })
      .map(function (data) {
        return OngoingElection.getPDResult(data);
      });
  }

  static async loadData(election) {
    if (election.isLoaded) {
      throw new Error("Election is already loaded: " + election);
    }

    const pdResultList = await OngoingElection.getPDResultList();
    election.resultList = Election.expand(pdResultList);
    election.resultIdx = Election.buildResultIdx(election.resultList);
    election.isLoaded = true;
    return election;
  }
}

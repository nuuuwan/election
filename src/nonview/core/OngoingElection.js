import { Time, WWW } from "../base";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class OngoingElection {
  static URL =
    "https://raw.githubusercontent.com/nuuuwan/prespollsl2024_py/main/data/fake/test2-2024.json";
    
  static getResult(data, idKey) {
    const summary = Summary.fromDict(data["summary"]);
    const partyToVotes = PartyToVotes.fromDict(data["party_to_votes"]);

    return new Result(
      data[idKey],
      summary,
      partyToVotes,
      data["result_time"].substring(0, 19)
    );
  }

  static async getRawData() {
    const timeStamp = Time.now().timeID;
    console.debug("OngoingElection.getRawData", timeStamp);
    return await WWW.json(OngoingElection.URL, timeStamp);
  }

  static async getResultList(idKey) {
    const rawDataList = await OngoingElection.getRawData();
    return rawDataList
      .filter(function (data) {
        return data["result_time"] !== 0;
      })
      .sort(function (a, b) {
        return (a.resultTime || "").localeCompare(b.resultTime || "");
      })
      .map(function (data) {
        return OngoingElection.getResult(data, idKey);
      });
  }

  static async loadData(election) {
    if (election.isLoaded) {
      throw new Error("Election is already loaded: " + election);
    }

    // const pdResultList = await OngoingElection.getResultList('pd_id');
    // election.build(pdResultList);


    
    const edResultList = await OngoingElection.getResultList('ed_id');
    console.debug({edResultList});
    election.build(null, edResultList);



    return election;
  }
}

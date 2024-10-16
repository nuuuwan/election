import { Time, WWW } from "..";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";
import Summary from "./Summary";

export default class OngoingElection {
  static getURL(election) {
    switch (election.date) {
    case "2024-09-21":
      return "https://raw.githubusercontent.com/nuuuwan/prespollsl2024_py/refs/heads/main/data/ec/prod1-2024.json";
    case "2024-09-22":
      return "https://raw.githubusercontent.com/nuuuwan/prespollsl2024_py/refs/heads/main/data/ec/prod2-2024.json";
    default:
      throw new Error("Unknown election date: " + election.date);
    }
  }

  static getIDKey(election) {
    switch (election.date) {
    case "2024-09-21":
      return "pd_id";
    case "2024-09-22":
      return "ed_id";
    default:
      throw new Error("Unknown election date: " + election.date);
    }
  }

  static getResult(data, idKey) {
    const summary = Summary.fromDict(data.summary);
    const partyToVotes = PartyToVotes.fromDict(data.party_to_votes);

    return new Result(
      data[idKey],
      summary,
      partyToVotes,
      data.result_time.substring(0, 19)
    );
  }

  static async getRawData(election) {
    const timeStamp = Time.now().timeID;
    return await WWW.json(OngoingElection.getURL(election), timeStamp);
  }

  static async getResultList(election, idKey) {
    const rawDataList = await OngoingElection.getRawData(election);
    return rawDataList
      .filter(function (data) {
        return data.result_time && data.result_time !== 0;
      })
      .sort(function (a, b) {
        return a.result_time.localeCompare(b.result_time);
      })
      .map(function (data) {
        return OngoingElection.getResult(data, idKey);
      });
  }

  static async loadData(election) {
    if (election.isLoaded) {
      throw new Error("Election is already loaded: " + election);
    }

    const baseResultList = await OngoingElection.getResultList(
      election,
      OngoingElection.getIDKey(election)
    );

    if (baseResultList.length > 0) {
      election.build(baseResultList);
    }

    return election;
  }
}

import ELECTION_LIST_TUPLES from "../Election/ELECTION_LIST_TUPLES";
import EntType from "../../base/EntType";
import Election from "../Election/Election";
import ArrayX from "../../base/ArrayX";

export default class ElectionHistory {
  constructor(elections) {
    this.elections = elections;
  }

  static async loadElections() {
    const unsorted = await Promise.all(
      ELECTION_LIST_TUPLES.map(async ([electionType, date]) => {
        const baseEntType = Election.getBaseEntTypeFromDate(date) || EntType.PD;
        const election = new Election(electionType, date, baseEntType);
        await election.__loadData();
        return election;
      })
    );

    const sorted = unsorted.sort((a, b) => a.date.localeCompare(b.date));
    return sorted;
  }

  static async load() {
    const elections = await ElectionHistory.loadElections();
    return new ElectionHistory(elections);
  }

  static singletonHistory(currentElection) {
    return new ElectionHistory([currentElection]);
  }

  getHistory(currentElection) {
    return new ElectionHistory(this.getPastElectionList(currentElection));
  }

  getHistoryOfSameType(currentElection) {
    return new ElectionHistory(
      this.getPastElectionListOfSameType(currentElection)
    );
  }

  getPastElectionList(currentElection) {
    return this.elections.filter(function (election) {
      return election.date.localeCompare(currentElection.date) < 0;
    });
  }

  getPastElectionListOfSameType(currentElection) {
    return this.getPastElectionList(currentElection).filter(function (
      election
    ) {
      return election.electionType === currentElection.electionType;
    });
  }

  getPreviousElection(currentElection) {
    const previousElections = this.getPastElectionList(currentElection);
    return ArrayX.last(previousElections);
  }

  getPreviousElectionOfSameType(currentElection) {
    const previousElections =
      this.getPastElectionListOfSameType(currentElection);
    return ArrayX.last(previousElections);
  }
}
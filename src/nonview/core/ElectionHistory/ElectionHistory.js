import ELECTION_LIST_TUPLES from '../Election/ELECTION_LIST_TUPLES';
import EntType from '../../base/EntType';
import Election from '../Election/Election';

export default class ElectionHistory {
  constructor(electionList) {
    this.electionList = electionList;
  }

  static listAllUnloaded() {
    return ELECTION_LIST_TUPLES.map(function ([electionType, date]) {
      const baseEntType = EntType.PD;
      return new Election(electionType, date, baseEntType);
    }).sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });
  }

  static _getUnloadedElectionList(electionCurrent) {
    const unfilteredList = ElectionHistory.listAllUnloaded();
    return unfilteredList.filter(function (election) {
      return (
        election.date.localeCompare(electionCurrent.date) <= 0 &&
        election.electionType === electionCurrent.electionType
      );
    });
  }

  static async _getLoadedElectionList(electionCurrent) {
    const unloadedElectionList =
      ElectionHistory._getUnloadedElectionList(electionCurrent);
    return await Promise.all(
      unloadedElectionList.map(async function (election) {
        if (election.title === electionCurrent.title) {
          return electionCurrent;
        }
        return await election.__loadData();
      }),
    );
  }

  static async load(electionCurrent) {
    const electionList = await ElectionHistory._getLoadedElectionList(
      electionCurrent,
    );
    return new ElectionHistory(electionList);
  }

  get length() {
    return this.electionList.length;
  }

  get electionCurrent() {
    return this.electionList[this.length - 1];
  }

  get electionPrevious() {
    return this.electionList[this.length - 2];
  }

  get previousElectionList() {
    return this.electionList.slice(0, this.length - 1);
  }

  get previousHistory() {
    return new ElectionHistory(this.previousElectionList);
  }
}

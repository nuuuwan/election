import ELECTION_LIST_TUPLES from "./ELECTION_LIST_TUPLES";

import ElectionBase from "./ElectionBase.js";

import ElectionGetters from "./ElectionGetters.js";

import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";
import ElectionStaticLoaderMixin from "./ElectionStaticLoaderMixin.js";
import ElectionLoaderMixin from "./ElectionLoaderMixin.js";
import EntType from "../../base/EntType.js";


class Election extends ElectionBase {
  
  copy() {
    return new Election(this.electionType, this.date, this.baseEntType);
  }

  getResult(id) {
    if (!this.isLoaded) {
      return null;
    }
    return this.resultIdx[id];
  }

  static async fromElectionTypeAndDate(electionType, date) {
    const election = new Election(electionType, date, EntType.PD);
    await election.__loadData();
    return election;
  }

  static getBaseEntTypeFromDate(date) {
    switch (date) {
      case "2024-09-21":
        return EntType.PD;
      case "2024-09-22":
        return EntType.ED;
      default:
        return undefined;
    }
  }

  static async listAll() {
    const elections = await Promise.all(
      ELECTION_LIST_TUPLES.map(async ([electionType, date]) => {
        const baseEntType = Election.getBaseEntTypeFromDate(date) || EntType.PD;
        const election = new Election(electionType, date, baseEntType);
        await election.__loadData();
        return election;
      })
    );

    return elections.sort((a, b) => a.date.localeCompare(b.date));
  }

  // Subset Election

  getSubsetElectionByBaseResultList(baseResultList) {
    const election = this.copy();
    election.build( baseResultList);
    return election;
  }

  getSubsetElectionByEntIDList(entIDList) {
    const baseResultList = entIDList
      .map(
        function (entID) {
          return this.getResult(entID);
        }.bind(this)
      )
      .filter(function (result) {
        return result !== undefined;
      });
    return this.getSubsetElectionByBaseResultList(baseResultList);
  }

  getElectionSubset(nResultsDisplay) {
    if (!this.baseResultList) {
      return this.copy();
    }
    const baseResultList = this.baseResultList.slice(0, nResultsDisplay);
    return this.getSubsetElectionByBaseResultList(baseResultList);
  }
}

Object.assign(Election.prototype, ElectionGetters);
Object.assign(Election.prototype, ElectionLoaderMixin);
Object.assign(Election, ElectionStaticUtilsMixin);
Object.assign(Election, ElectionStaticLoaderMixin);

export default Election;

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
    if (!this.resultIdx[id]) {
      throw new Error(`[${this.title}] No result for "${id}"`);
    }
    return this.resultIdx[id];
  }

  static async fromElectionTypeAndDate(electionType, date) {
    const baseEntType = date === "2024-09-22" ? EntType.ED : EntType.PD;
    const election = new Election(electionType, date, baseEntType);
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

  // Subset Election

  getSubsetElectionByBaseResultList(baseResultList) {
    const election = this.copy();
    election.build(baseResultList);
    return election;
  }

  getSubsetElectionByEntIDList(entIDList) {
    const baseResultList = entIDList
      .map(
        function (entID) {
          try {
            return this.getResult(entID);
          } catch {
            return null;
          }
        }.bind(this)
      )
      .filter(function (result) {
        return result !== null;
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

import ELECTION_LIST_TUPLES from "./ELECTION_LIST_TUPLES";

import ElectionBase from "./ElectionBase.js";

import ElectionGetters from "./ElectionGetters.js";

import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";
import ElectionStaticLoaderMixin from "./ElectionStaticLoaderMixin.js";
import ElectionLoaderMixin from "./ElectionLoaderMixin.js";

class Election extends ElectionBase {
  getResult(id) {
    if (!this.isLoaded) {
      return null;
    }
    return this.resultIdx[id];
  }

  static async fromElectionTypeAndDate(electionType, date) {
    const election = new Election(electionType, date);
    await election.__loadData();
    return election;
  }

  static async listAll() {
    const elections = await Promise.all(
      ELECTION_LIST_TUPLES.map(async ([electionType, date]) => {
        const election = new Election(electionType, date);
        await election.__loadData();
        return election;
      })
    );

    return elections.sort((a, b) => a.date.localeCompare(b.date));
  }

  // Subset Election

  getSubsetElectionByPDResultList(pdResultList) {
    const election = new Election(this.electionType, this.date);
    election.build(pdResultList);
    return election;
  }

  getSubsetElectionByPDIDList(pdIDList) {
    const pdResultList = pdIDList
      .map(
        function (pdID) {
          return this.getResult(pdID);
        }.bind(this)
      )
      .filter(function (result) {
        return result !== undefined;
      });
    return this.getSubsetElectionByPDResultList(pdResultList);
  }

  getElectionSubset(nResultsDisplay) {
    const pdResultList = this.pdResultList.slice(0, nResultsDisplay);
    return this.getSubsetElectionByPDResultList(pdResultList);
  }
}

Object.assign(Election.prototype, ElectionGetters);
Object.assign(Election.prototype, ElectionLoaderMixin);
Object.assign(Election, ElectionStaticUtilsMixin);
Object.assign(Election, ElectionStaticLoaderMixin);

export default Election;

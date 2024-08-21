import { WWW } from "../../base/index.js";
import ELECTION_LIST_TUPLES from "./ELECTION_LIST_TUPLES";
import Result from "../Result.js";
import ElectionBase from "./ElectionBase.js";

import ElectionGetters from "./ElectionGetters.js";

import OngoingElection from "../OngoingElection.js";
import ElectionStaticUtilsMixin from "./ElectionStaticUtilsMixin.js";
import ElectionStaticLoadedMixin from "./ElectionStaticLoaderMixin.js";

class Election extends ElectionBase {
  static MIN_RESULTS = 10;

  getResult(id) {
    if (!this.isLoaded) {
      return null;
    }
    return this.resultIdx[id];
  }
  async __loadData() {
    if (this.isFuture) {
      await OngoingElection.loadData(this);
    } else {
      this.resultList = await this.getResultList();
      this.resultIdx = Election.buildResultIdx(this.resultList);
      this.isLoaded = this.resultList.length > Election.MIN_RESULTS;
    }
  }

  async getRawDataList() {
    return await WWW.tsv(this.urlData);
  }

  async getResultList() {
    const rawData = await this.getRawDataList();

    const filteredRawData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") && d.entity_id.length >= 6;
    });

    const resultList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });

    const expandedResultList = Election.expand(resultList);

    const sortedResultList = expandedResultList.sort(function (a, b) {
      return a.summary.valid - b.summary.valid;
    });

    return sortedResultList;
  }

  static buildResultIdx(resultList) {
    return Object.fromEntries(
      resultList.map((result) => [result.entID, result])
    );
  }

  static async fromElectionTypeAndDate(electionType, date) {
    const election = new Election(electionType, date);
    await election.__loadData();
    return election;
  }

  static async listAll() {
    const elections = ELECTION_LIST_TUPLES.map(
      ([electionType, date]) => new Election(electionType, date)
    ).sort(function (a, b) {
      return a.date.localeCompare(b.date);
    });

    await Promise.all(elections.map((election) => election.__loadData()));
    return elections;
  }

  get pdResultList() {
    const EXCLUDE_PD_IDS = ["EC-11D"];
    return this.resultList.filter(function (result) {
      const pdID = result.entID;
      return (
        pdID.length === 6 &&
        !EXCLUDE_PD_IDS.includes(pdID) &&
        pdID.substring(5, 6) !== "-"
      );
    });
  }

  getSubsetElectionByPDResultList(pdResultList) {
    const resultList = Election.expand(pdResultList);
    const election = new Election(this.electionType, this.date);
    election.resultList = resultList;
    election.resultIdx = Election.buildResultIdx(resultList);
    election.isLoaded = true;
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

  getPartyToWins() {
    return Object.values(this.resultIdx).reduce(function (partyToWins, result) {
      const winningPartyID = result.partyToVotes.winningPartyID;
      if (!partyToWins[winningPartyID]) {
        partyToWins[winningPartyID] = 0;
      }
      partyToWins[winningPartyID]++;
      return partyToWins;
    }, {});
  }


}

Object.assign(Election.prototype, ElectionGetters);
Object.assign(Election, ElectionStaticUtilsMixin);
Object.assign(Election, ElectionStaticLoadedMixin);

export default Election;

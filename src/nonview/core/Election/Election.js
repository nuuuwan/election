import { WWW } from "../../base/index.js";
import ELECTION_LIST_TUPLES from "./ELECTION_LIST_TUPLES";
import Result from "../Result.js";
import ElectionBase from "./ElectionBase.js";

import ElectionGetters from "./ElectionGetters.js";
import ElectionGettersStatic from "./ElectionGettersStatic.js";
import ElectionExpand from "./ElectionExpand.js";

class Election extends ElectionBase {
  static MIN_RESULTS = 10;
  constructor(electionType, date) {
    super(electionType, date);
    this.resultsList = null;
    this.resultsIdx = null;
    this.isLoaded = false;
  }
  getResults(id) {
    if (!this.isLoaded || !this.resultsIdx[id]) {
      return null;
    }
    return this.resultsIdx[id];
  }
  async __loadData() {
    if (this.isFuture) {
      return;
    }
    this.resultsList = await this.getResultsList();

    this.resultsIdx = Election.buildResultsIdx(this.resultsList);

    this.isLoaded = this.resultsList.length > Election.MIN_RESULTS;
  }

  async getRawDataList() {
    return await WWW.tsv(this.urlData);
  }

  async getResultsList() {
    const rawData = await this.getRawDataList();

    const filteredRawData = rawData.filter(function (d) {
      return d.entity_id.startsWith("EC-") && d.entity_id.length >= 6;
    });

    const resultsList = filteredRawData.map(function (d) {
      return Result.fromDict(d);
    });

    const expandedResultsList = Election.expand(resultsList);

    const sortedResultsList = expandedResultsList.sort(function (a, b) {
      return a.summary.valid - b.summary.valid;
    });

    return sortedResultsList;
  }

  static buildResultsIdx(resultsList) {
    return Object.fromEntries(
      resultsList.map((result) => [result.entID, result])
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
    ).sort();

    await Promise.all(elections.map((election) => election.__loadData()));
    return elections;
  }

  static listAllNoLoad() {
    const elections = ELECTION_LIST_TUPLES.map(
      ([electionType, date]) => new Election(electionType, date)
    ).sort();

    return elections;
  }

  static async fromDate(date) {
    const elections = await Election.listAll();
    return Election.findFromDate(elections, date);
  }

  static findFromDate(elections, date) {
    return elections.find(function (election) {
      return election.date === date;
    });
  }

  static filterCompleted(elections) {
    return elections.filter(function (election) {
      return !election.isFuture;
    });
  }

  static getLastElection(elections) {
    return Election.filterCompleted(elections).sort().reverse()[0];
  }

  get pdResultsList() {
    const EXCLUDE_PD_IDS = ["EC-11D"];
    return this.resultsList.filter(function (result) {
      const pdID = result.entID;
      return (
        pdID.length === 6 &&
        !EXCLUDE_PD_IDS.includes(pdID) &&
        pdID.substring(5, 6) !== "-"
      );
    });
  }
}

Object.assign(Election.prototype, ElectionGetters);
Object.assign(Election, ElectionGettersStatic);
Object.assign(Election, ElectionExpand);
export default Election;

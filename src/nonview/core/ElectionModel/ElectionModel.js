import { MathX } from "../../base";
import Election from "../Election/Election";
import Party from "../Party";
import PartyToVotes from "../PartyToVotes";

import ElectionModelTrainMixin from "./ElectionModelTrainMixin";

export default class ElectionModel {
  static MIN_RESULTS_FOR_PREDICTION = 1;
  static PARTY_UNCERTAIN = Party.UNCERTAIN.id;
  static ERROR_CONF = 0.7;
  static DEFAULT_P_ERROR = 0.2;

  constructor(
    elections,
    currentElection,
    releasedPDIDList,
    nonReleasedPDIDList
  ) {
    this.elections = elections;
    this.currentElection = currentElection;
    this.releasedPDIDList = releasedPDIDList;
    this.nonReleasedPDIDList = nonReleasedPDIDList;

    this.trainingOutput = this.train();
  }

  getPreviousElections() {
    // All elections before currentElection.
    return this.elections.filter(
      (election) => election.localeCompare(this.currentElection) < 0
    );
  }

  getXEvaluate() {
    return ElectionModel.getFeatureMatrix(
      [this.currentElection],
      this.releasedPDIDList
    );
  }

  train() {
    const timerID = "⌚ ElectionModel.train";
    console.time(timerID);

    // Common
    const previousElections = this.getPreviousElections();
    const electionYears = previousElections.map((election) => election.date);
    console.debug(
      `🤖 Training model with data from ${electionYears.length} previous elections.`
    );
    console.debug(
      `🤖 Training a "[${this.releasedPDIDList.length}] -> [${this.nonReleasedPDIDList.length}]" model.`
    );

    const XAll = ElectionModel.getFeatureMatrixListForElections(
      previousElections,
      this.releasedPDIDList
    );
    const YAll = ElectionModel.getFeatureMatrixListForElections(
      previousElections,
      this.nonReleasedPDIDList
    );

    // Computer Model Error
    const pError = ElectionModel.getPErrorEvaluate(XAll, YAll);

    // Train Model
    const model = ElectionModel.trainModel(XAll, YAll);

    // Evaluate Projection
    const normPDToPartyToPVotes = ElectionModel.getProjection(
      model,
      this.currentElection,
      this.getXEvaluate(),
      this.nonReleasedPDIDList
    );
    console.timeEnd(timerID);
    return { normPDToPartyToPVotes, pError };
  }

  static getSimulatedResult(lastElection, pdID, normPDToPartyToPVotes, pError) {
    // We assume the summary from the last election is valid.
    if (!lastElection) {
      return null;
    }
    let result = JSON.parse(JSON.stringify(lastElection.getResults(pdID)));
    if (!result) {
      return null;
    }
    const valid = result.summary.valid;
    const partyToPVotes = normPDToPartyToPVotes[pdID];

    const partyToVotes = Object.entries(partyToPVotes).reduce(
      function (partyToVotes, [partyID, pVotes]) {
        pVotes = MathX.forceRange(pVotes, 0, 1);
        const votes = Math.round(pVotes * valid);

        const kError = Math.max(0, 1 - pError);
        const votesMin = Math.round(pVotes * kError * valid);
        partyToVotes[partyID] = votesMin;
        partyToVotes[ElectionModel.PARTY_UNCERTAIN] += votes - votesMin;
        return partyToVotes;
      },
      { [ElectionModel.PARTY_UNCERTAIN]: 0 }
    );

    result.partyToVotes = new PartyToVotes(partyToVotes);
    return result;
  }

  getElectionNotReleasedPrediction() {
    const { normPDToPartyToPVotes, pError } = this.trainingOutput;
    const lastElection = this.getPreviousElections().slice(-1)[0];

    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );

    const releasedResultsList = this.releasedPDIDList.map((pdID) =>
      this.currentElection.getResults(pdID)
    );
    const notReleasedResultsList = this.nonReleasedPDIDList
      .map(function (pdID) {
        return ElectionModel.getSimulatedResult(
          lastElection,
          pdID,
          normPDToPartyToPVotes,
          pError
        );
      })
      .filter((result) => result !== null);

    election.resultsList = [
      ...releasedResultsList,
      ...notReleasedResultsList,
    ].filter((result) => result);
    election.resultsList = Election.expand(election.resultsList);
    election.resultsIdx = Election.buildResultsIdx(election.resultsList);
    election.isLoaded = true;

    return election;
  }
}

Object.assign(ElectionModel, ElectionModelTrainMixin);

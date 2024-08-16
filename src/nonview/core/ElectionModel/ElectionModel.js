import Election from "../Election/Election";

import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
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
    return ElectionModelUtils.getFeatureMatrix(
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

    const XAll = ElectionModelUtils.getFeatureMatrixListForElections(
      previousElections,
      this.releasedPDIDList
    );
    const YAll = ElectionModelUtils.getFeatureMatrixListForElections(
      previousElections,
      this.nonReleasedPDIDList
    );

    // Computer Model Error
    const pError = ElectionModelUtils.getPErrorEvaluate(XAll, YAll);

    // Train Model
    const model = ElectionModelUtils.trainModel(XAll, YAll);

    // Evaluate Projection
    const normPDToPartyToPVotes = ElectionModelUtils.getProjection(
      model,
      this.currentElection,
      this.getXEvaluate(),
      this.nonReleasedPDIDList
    );
    console.timeEnd(timerID);
    return { normPDToPartyToPVotes, pError };
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
        return ElectionModelUtils.getSimulatedResult(
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

Object.assign(ElectionModel, ElectionModelUtils);

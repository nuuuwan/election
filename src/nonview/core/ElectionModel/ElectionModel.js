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
    return Election.getPreviousElections(this.elections, this.currentElection);
  }

  getXEvaluate() {
    return ElectionModelUtils.getFeatureMatrix(
      [this.currentElection],
      this.releasedPDIDList
    );
  }

  train() {
    // Common
    const previousElections = this.getPreviousElections();

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

    return { normPDToPartyToPVotes, pError };
  }

  getElectionNotReleasedPrediction() {
    const { normPDToPartyToPVotes, pError } = this.trainingOutput;
    const lastElection = this.getPreviousElections().slice(-1)[0];

    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );

    const releasedResultList = this.releasedPDIDList.map((pdID) =>
      this.currentElection.getResult(pdID)
    );
    const notReleasedResultList = this.nonReleasedPDIDList
      .map(function (pdID) {
        return ElectionModelUtils.getSimulatedResult(
          lastElection,
          pdID,
          normPDToPartyToPVotes,
          pError
        );
      })
      .filter((result) => result !== null);

    election.resultList = [
      ...releasedResultList,
      ...notReleasedResultList,
    ].filter((result) => result);
    election.resultList = Election.expand(election.resultList);
    election.resultIdx = Election.buildResultIdx(election.resultList);
    election.isLoaded = true;

    return election;
  }
}

Object.assign(ElectionModel, ElectionModelUtils);

import Election from "../Election/Election";
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";

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

  getXEvaluate() {
    return ElectionModelFeatureUtils.getFeatureMatrix(
      [this.currentElection],
      this.releasedPDIDList
    );
  }

  train() {
    // Common
    const previousElections = Election.getPreviousElections(
      this.elections,
      this.currentElection
    );

    const XAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousElections,
      this.releasedPDIDList
    );
    const YAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
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

  getProjectedResultList() {
    const { normPDToPartyToPVotes, pError } = this.trainingOutput;
    const lastElection = Election.getPenultimateElection(
      this.elections,
      this.currentElection
    );
    const lastElectionOfSameType = Election.getPenultimateElectionOfSameType(
      this.elections,
      this.currentElection
    );
    const notReleasedResultList = this.nonReleasedPDIDList
      .map(function (pdID) {
        return ElectionModelUtils.getSimulatedResult(
          lastElection,
          lastElectionOfSameType,
          pdID,
          normPDToPartyToPVotes,
          pError
        );
      })
      .filter((result) => result !== null);

    const releasedResultList = this.releasedPDIDList.map((pdID) =>
      this.currentElection.getResult(pdID)
    );

    return [...releasedResultList, ...notReleasedResultList].filter(
      (result) => result
    );
  }

  getElectionNotReleasedPrediction() {
    const election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );
    election.resultList = this.getProjectedResultList();
    election.resultList = Election.expand(election.resultList);
    election.resultIdx = Election.buildResultIdx(election.resultList);
    election.isLoaded = true;
    return election;
  }
}

Object.assign(ElectionModel, ElectionModelUtils);

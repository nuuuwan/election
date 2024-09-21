import Election from "../Election/Election";
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";

import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  constructor(
    elections,
    currentElection,
    releasedEntIDList,
    nonReleasedEntIDList
  ) {
    this.elections = elections;
    this.currentElection = currentElection;
    this.releasedEntIDList = releasedEntIDList;
    this.nonReleasedEntIDList = nonReleasedEntIDList;
    this.trainingOutput = this.train();
  }

  getXEvaluate() {
    return ElectionModelFeatureUtils.getFeatureMatrix(
      [this.currentElection],
      this.releasedEntIDList
    );
  }

  train() {
    const previousElections = Election.getPreviousElections(
      this.elections,
      this.currentElection
    );

    const XAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousElections,
      this.releasedEntIDList
    );
    const YAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousElections,
      this.nonReleasedEntIDList
    );
    const pError = ElectionModelUtils.getPErrorEvaluate(XAll, YAll);
    const model = ElectionModelUtils.trainModel(XAll, YAll);

    const normPDToPartyToPVotes = ElectionModelProjectionUtils.getProjection(
      model,
      this.currentElection,
      this.getXEvaluate(),
      this.nonReleasedEntIDList
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
    const notReleasedResultList = this.nonReleasedEntIDList
      .map(function (entID) {
        return ElectionModelProjectionUtils.getSimulatedResult(
          lastElection,
          lastElectionOfSameType,
          entID,
          normPDToPartyToPVotes,
          pError
        );
      })
      .filter((result) => result !== null);

    const releasedResultList = this.releasedEntIDList.map((entID) =>
      this.currentElection.getResult(entID)
    );

    return [...releasedResultList, ...notReleasedResultList].filter(
      (result) => result
    );
  }

  getElectionNotReleasedPrediction() {
    const election = this.currentElection.copy();
    const baseResultList = this.getProjectedResultList();
    election.build(baseResultList);
    return election;
  }
}

Object.assign(ElectionModel, ElectionModelUtils);

import { ElectionHistory } from "../..";
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";

import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  constructor(
    electionHistory,
    currentElection,
    releasedEntIDList,
    nonReleasedEntIDList
  ) {
    this.electionHistory = electionHistory;
    this.currentElection = currentElection;
    this.releasedEntIDList = releasedEntIDList;
    this.nonReleasedEntIDList = nonReleasedEntIDList;
    this.trainingOutput = this.train();
  }

  getXEvaluate() {
    return ElectionModelFeatureUtils.getFeatureMatrix(
      ElectionHistory.singletonHistory(this.currentElection),
      this.releasedEntIDList
    );
  }

  train() {
    const previousHistory = this.electionHistory.getHistory(
      this.currentElection
    );

    const XAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousHistory,
      this.releasedEntIDList
    );
    const YAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousHistory,
      this.nonReleasedEntIDList
    );
    const pError = ElectionModelUtils.getPErrorEvaluate(XAll, YAll);
    const model = ElectionModelUtils.trainModel(XAll, YAll);

    const normPDToPartyToPVotes =
      ElectionModelProjectionUtils.getEntToPartyToPVotes(
        model,
        this.currentElection,
        this.getXEvaluate(),
        this.nonReleasedEntIDList
      );
    return { normPDToPartyToPVotes, pError };
  }

  getProjectedResultList() {
    const { normPDToPartyToPVotes, pError } = this.trainingOutput;
    const lastElection = this.electionHistory.getPreviousElection(
      this.currentElection
    );
    const lastElectionOfSameType =
      this.electionHistory.getPreviousElectionOfSameType(this.currentElection);

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

  getElectionProjected() {
    const election = this.currentElection.copy();
    const baseResultList = this.getProjectedResultList();
    election.build(baseResultList);
    return election;
  }
}

Object.assign(ElectionModel, ElectionModelUtils);

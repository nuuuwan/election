import { ElectionHistory } from "../..";
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";

import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  static getElectionProjected(currentElection, electionHistory) {
    const releasedEntIDList = currentElection.baseEntIDList;
    const previousElection =
      electionHistory.getPreviousElection(currentElection);
    const nonReleasedEntIDList = previousElection.baseEntIDList.filter(
      (entID) => !releasedEntIDList.includes(entID)
    );

    const trainingOutput = ElectionModel.train(
      currentElection,
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList
    );

    const election = currentElection.copy();
    const baseResultList = ElectionModel.getProjectedResultList(
      currentElection,
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList,
      trainingOutput
    );
    election.build(baseResultList);
    return election;
  }

  static getXEvaluate(currentElection, releasedEntIDList) {
    return ElectionModelFeatureUtils.getFeatureMatrix(
      ElectionHistory.singletonHistory(currentElection),
      releasedEntIDList
    );
  }

  static train(
    currentElection,
    electionHistory,
    releasedEntIDList,
    nonReleasedEntIDList
  ) {
    const previousHistory = electionHistory.getHistory(currentElection);

    const XAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousHistory,
      releasedEntIDList
    );
    const YAll = ElectionModelFeatureUtils.getFeatureMatrixListForElections(
      previousHistory,
      nonReleasedEntIDList
    );
    const pError = ElectionModelUtils.getPErrorEvaluate(XAll, YAll);
    const model = ElectionModelUtils.trainModel(XAll, YAll);

    const normPDToPartyToPVotes =
      ElectionModelProjectionUtils.getEntToPartyToPVotes(
        model,
        currentElection,
        ElectionModel.getXEvaluate(currentElection, releasedEntIDList),
        nonReleasedEntIDList
      );
    return { normPDToPartyToPVotes, pError };
  }

  static getProjectedResultList(
    currentElection,
    electionHistory,
    releasedEntIDList,
    nonReleasedEntIDList,
    trainingOutput
  ) {
    const { normPDToPartyToPVotes, pError } = trainingOutput;
    const lastElection = electionHistory.getPreviousElection(currentElection);
    const lastElectionOfSameType =
      electionHistory.getPreviousElectionOfSameType(currentElection);

    const notReleasedResultList = nonReleasedEntIDList
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

    const releasedResultList = releasedEntIDList.map((entID) =>
      currentElection.getResult(entID)
    );

    return [...releasedResultList, ...notReleasedResultList].filter(
      (result) => result
    );
  }
}

Object.assign(ElectionModel, ElectionModelUtils);

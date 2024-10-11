import { ElectionHistory } from "../..";
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";

import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  static getElectionProjected(currentElection, electionHistory) {
    const releasedEntIDList = currentElection.baseEntIDList;

    const nonReleasedEntIDList = ElectionModel.getNonReleasedEntIDList(
      currentElection,
      electionHistory,
      releasedEntIDList
    );

    const { XAll, YAll } = ElectionModel.trainingData(
      currentElection,
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList
    );
    const pError = ElectionModelUtils.getPErrorEvaluate(XAll, YAll);

    const pdToPartyToPVotes = ElectionModel.getPDToPartyToPVotes(
      currentElection,
      releasedEntIDList,
      nonReleasedEntIDList,
      XAll,
      YAll
    );

    return ElectionModel.buildElection(
      currentElection,
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
      pError
    );
  }

  static buildElection(
    currentElection,
    electionHistory,
    releasedEntIDList,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {
    const election = currentElection.copy();

    const baseResultList = ElectionModel.getProjectedResultList(
      currentElection,
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
      pError
    );
    election.build(baseResultList);

    return election;
  }

  static getNonReleasedEntIDList(
    currentElection,
    electionHistory,
    releasedEntIDList
  ) {
    const previousElection =
      electionHistory.getPreviousElection(currentElection);

    return previousElection.baseEntIDList.filter(
      (entID) => !releasedEntIDList.includes(entID)
    );
  }

  static getXEvaluate(currentElection, releasedEntIDList) {
    return ElectionModelFeatureUtils.getFeatureMatrix(
      ElectionHistory.singletonHistory(currentElection),
      releasedEntIDList
    );
  }

  static trainingData(
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

    return { XAll, YAll };
  }

  static getPDToPartyToPVotes(
    currentElection,
    releasedEntIDList,
    nonReleasedEntIDList,
    XAll,
    YAll
  ) {
    const model = ElectionModelUtils.trainModel(XAll, YAll);

    return ElectionModelProjectionUtils.getEntToPartyToPVotes(
      model,
      currentElection,
      ElectionModel.getXEvaluate(currentElection, releasedEntIDList),
      nonReleasedEntIDList
    );
  }

  static getProjectedResultList(
    currentElection,
    electionHistory,
    releasedEntIDList,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {
    const lastElection = electionHistory.getPreviousElection(currentElection);
    const lastElectionOfSameType =
      electionHistory.getPreviousElectionOfSameType(currentElection);

    const notReleasedResultList = nonReleasedEntIDList
      .map(function (entID) {
        return ElectionModelProjectionUtils.getSimulatedResult(
          lastElection,
          lastElectionOfSameType,
          entID,
          pdToPartyToPVotes,
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

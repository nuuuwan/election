
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";
import ElectionModelSimulationUtils from "./ElectionModelSimulationUtils";
import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  static getElectionProjected(currentElection, electionHistory) {
    const releasedEntIDList = currentElection.baseEntIDList;

    const nonReleasedEntIDList = ElectionModel.getNonReleasedEntIDList(
      currentElection,
      electionHistory,
      releasedEntIDList
    );

    const { XAll, YAll } = ElectionModelFeatureUtils.trainingData(
      currentElection,
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList
    );
    const pError = ElectionModelUtils.getPErrorByHoldout(XAll, YAll);

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

    const baseResultList = ElectionModelSimulationUtils.simulateResultList(
      currentElection,
      electionHistory,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
      pError
    )
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





  static getPDToPartyToPVotes(
    currentElection,
    releasedEntIDList,
    nonReleasedEntIDList,
    XAll,
    YAll
  ) {
    const model = ElectionModelUtils.trainModel(XAll, YAll);

    return ElectionModelProjectionUtils.getPDToPartyToPVotes(
      model,
      currentElection,
      ElectionModelFeatureUtils.getXEvaluate(currentElection, releasedEntIDList),
      nonReleasedEntIDList
    );
  }

  static getReleasedResultList(currentElection, releasedEntIDList) {
    return releasedEntIDList.map((entID) => currentElection.getResult(entID));
  }


}



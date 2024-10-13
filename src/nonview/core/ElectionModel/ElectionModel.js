import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";
import ElectionModelSimulationUtils from "./ElectionModelSimulationUtils";
import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  static getElectionProjected(electionHistory) {
    const currentElection = electionHistory.electionCurrent;
    const pastElectionList =
      electionHistory.previousElectionList;
    if (pastElectionList.length === 0) {
      return currentElection;
    }
    const releasedEntIDList = currentElection.baseEntIDList;

    const nonReleasedEntIDList = ElectionModel.getNonReleasedEntIDList(
      electionHistory,
      releasedEntIDList
    );

    const { XAll, YAll } = ElectionModelFeatureUtils.trainingData(
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
      electionHistory,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
      pError
    );
  }


  static getNonReleasedEntIDList(
    electionHistory,
    releasedEntIDList
  ) {

    const electionPrevious = electionHistory.electionPrevious;
    return electionPrevious.baseEntIDList.filter(
      (entID) => !releasedEntIDList.includes(entID)
    );
  }

  static buildElection(
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
    pError
  ) {
    const currentElection = electionHistory.electionCurrent;
    const election = currentElection.copy();

    const baseResultList = ElectionModelSimulationUtils.simulateResultList(
      electionHistory,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
      pError
    );
    election.build(baseResultList);

    return election;
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
      ElectionModelFeatureUtils.getXEvaluate(
        currentElection,
        releasedEntIDList
      ),
      nonReleasedEntIDList
    );
  }

  static getReleasedResultList(currentElection, releasedEntIDList) {
    return releasedEntIDList.map((entID) => currentElection.getResult(entID));
  }
}

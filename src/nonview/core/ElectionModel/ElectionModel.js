import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";
import ElectionModelProjectionUtils from "./ElectionModelProjectionUtils";
import ElectionModelSimulationUtils from "./ElectionModelSimulationUtils";
import ElectionModelUtils from "./ElectionModelUtils";

export default class ElectionModel {
  static getElectionProjected(electionHistory) {
    const currentElection = electionHistory.electionCurrent;
    
    const pastElectionList = electionHistory.previousElectionList;
    if (pastElectionList.length === 0) {
      return currentElection;
    }
    
    const releasedEntIDList = currentElection.baseEntIDList;
    const nonReleasedEntIDList = ElectionModel.getNonReleasedEntIDList(
      electionHistory,
    );

    const { XAll, YAll } = ElectionModelFeatureUtils.getTrainingData(
      electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList
    );

    const pError = ElectionModelUtils.getPErrorByHoldout(XAll, YAll);
    const pdToPartyToPVotes = ElectionModel.getPDToPartyToPVotes(
      electionHistory,
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
  ) {

    const electionPrevious = electionHistory.electionPrevious;
    const releasedEntIDList = electionHistory.electionCurrent.baseEntIDList;
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
    electionHistory,
    XAll,
    YAll
  ) {
    const currentElection = electionHistory.electionCurrent;
    const releasedEntIDList = currentElection.baseEntIDList;
    const nonReleasedEntIDList = ElectionModel.getNonReleasedEntIDList(
      electionHistory,
    );
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

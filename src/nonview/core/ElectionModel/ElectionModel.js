import MLModel from '../../base/MLModel/MLModel';
import ElectionModelFeatureUtils from './ElectionModelFeatureUtils';
import ElectionModelProjectionUtils from './ElectionModelProjectionUtils';
import ElectionModelSimulationUtils from './ElectionModelSimulationUtils';

export default class ElectionModel {
  constructor(electionHistory) {
    this.electionHistory = electionHistory;
    this.pdToPartyToPVotes = null;
    this.electionProjected = null;
    this.__load();
  }

  __load() {
    const pastElectionList = this.electionHistory.previousElectionList;
    if (pastElectionList.length === 0) {
      return this.electionHistory.electionCurrent;
    }

    const releasedEntIDList =
      this.electionHistory.electionCurrent.baseEntIDList;
    const nonReleasedEntIDList = ElectionModel.getNonReleasedEntIDList(
      this.electionHistory,
    );

    const { XAll, YAll } = ElectionModelFeatureUtils.getTrainingData(
      this.electionHistory,
      releasedEntIDList,
      nonReleasedEntIDList,
    );

    this.pdToPartyToPVotes = ElectionModel.getPDToPartyToPVotes(
      this.electionHistory,
      XAll,
      YAll,
    );

    this.electionProjected = ElectionModel.buildElection(
      this.electionHistory,
      nonReleasedEntIDList,
      this.pdToPartyToPVotes,
    );
  }

  static getNonReleasedEntIDList(electionHistory) {
    const electionPrevious = electionHistory.electionPrevious;
    const releasedEntIDList = electionHistory.electionCurrent.baseEntIDList;
    return electionPrevious.baseEntIDList.filter(
      (entID) => !releasedEntIDList.includes(entID),
    );
  }

  static buildElection(
    electionHistory,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
  ) {
    const electionCurrent = electionHistory.electionCurrent;
    const election = electionCurrent.copy();

    const baseResultList = ElectionModelSimulationUtils.simulateResultList(
      electionHistory,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
    );
    election.build(baseResultList);
    return election;
  }

  static getPDToPartyToPVotes(electionHistory, XAll, YAll) {
    const electionCurrent = electionHistory.electionCurrent;
    const releasedEntIDList = electionCurrent.baseEntIDList;
    const nonReleasedEntIDList =
      ElectionModel.getNonReleasedEntIDList(electionHistory);
    const model = MLModel.train(XAll, YAll);

    return ElectionModelProjectionUtils.getPDToPartyToPVotes(
      model,
      electionCurrent,
      ElectionModelFeatureUtils.getXEvaluate(
        electionCurrent,
        releasedEntIDList,
      ),
      nonReleasedEntIDList,
    );
  }

  static getReleasedResultList(electionCurrent, releasedEntIDList) {
    return releasedEntIDList.map((entID) => electionCurrent.getResult(entID));
  }
}

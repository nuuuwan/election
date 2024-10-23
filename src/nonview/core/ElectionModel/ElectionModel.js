import ArrayX from '../../base/ArrayX';
import MLModel from '../../base/MLModel/MLModel';
import ElectionModelFeatureUtils from './ElectionModelFeatureUtils';
import ElectionModelProjectionUtils from './ElectionModelProjectionUtils';
import ElectionModelSimulationUtils from './ElectionModelSimulationUtils';

export default class ElectionModel {
  constructor(electionCurrent, previousElectionList) {
    this.electionCurrent = electionCurrent;
    this.previousElectionList = previousElectionList;

    this.pdToPartyToPVotes = null;
    this.electionProjected = null;
    this.__build();
  }

  __build() {
    const pastElectionList = this.previousElectionList;
    if (pastElectionList.length === 0) {
      return this.electionCurrent;
    }

    const releasedEntIDList = this.electionCurrent.baseEntIDList;
    const nonReleasedEntIDList = this.getNonReleasedEntIDList();

    const { XAll, YAll } = ElectionModelFeatureUtils.getTrainingData(
      this.previousElectionList,
      releasedEntIDList,
      nonReleasedEntIDList,
    );

    this.pdToPartyToPVotes = ElectionModel.getPDToPartyToPVotes(
      this.electionCurrent,
      nonReleasedEntIDList,
      XAll,
      YAll,
    );

    this.electionProjected = ElectionModel.buildElection(
      this.electionCurrent,
      this.previousElectionList,
      nonReleasedEntIDList,
      this.pdToPartyToPVotes,
    );
  }

  getNonReleasedEntIDList() {
    const electionPrevious = ArrayX.last(this.previousElectionList);
    const releasedEntIDList = this.electionCurrent.baseEntIDList;
    return electionPrevious.baseEntIDList.filter(
      (entID) => !releasedEntIDList.includes(entID),
    );
  }

  static buildElection(
    electionCurrent,
    previousElectionList,
    nonReleasedEntIDList,
    pdToPartyToPVotes,
  ) {
    const election = electionCurrent.copy();

    const baseResultList = ElectionModelSimulationUtils.simulateResultList(
      electionCurrent,
      previousElectionList,
      nonReleasedEntIDList,
      pdToPartyToPVotes,
    );
    election.build(baseResultList);
    return election;
  }

  static getPDToPartyToPVotes(
    electionCurrent,
    nonReleasedEntIDList,
    XAll,
    YAll,
  ) {
    const releasedEntIDList = electionCurrent.baseEntIDList;
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

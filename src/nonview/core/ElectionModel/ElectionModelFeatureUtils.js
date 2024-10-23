import FeatureMatrix from './FeatureMatrix';

export default class ElectionModelFeatureUtils {
  static getTrainingData(
    previousElectionList,
    releasedEntIDList,
    nonReleasedEntIDList,
  ) {
    const XAll = FeatureMatrix.buildFromElectionList(
      previousElectionList,
      releasedEntIDList,
    );
    const YAll = FeatureMatrix.buildFromElectionList(
      previousElectionList,
      nonReleasedEntIDList,
    );

    return { XAll, YAll };
  }

  static getXEvaluate(currentElection, releasedEntIDList) {
    return FeatureMatrix.buildFromElection(currentElection, releasedEntIDList);
  }
}

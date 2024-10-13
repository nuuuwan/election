import FeatureMatrix from "./FeatureMatrix";

export default class ElectionModelFeatureUtils {
    static trainingData(
        currentElection,
        electionHistory,
        releasedEntIDList,
        nonReleasedEntIDList
    ) {
        const previousHistory = electionHistory.getHistory(currentElection);

        const XAll = FeatureMatrix.buildFromElectionHistory(
            previousHistory,
            releasedEntIDList
        );
        const YAll = FeatureMatrix.buildFromElectionHistory(
            previousHistory,
            nonReleasedEntIDList
        );

        return { XAll, YAll };
    }

    static getXEvaluate(currentElection, releasedEntIDList) {
        return FeatureMatrix.buildFromElection(currentElection, releasedEntIDList);
    }
}

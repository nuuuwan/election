import { ElectionHistory } from "../..";

export default class ElectionModelFeatureUtils {
  static getFeatureVector(election, partyID, baseEntIDList) {
    // Returns a vector with the % of votes party(ID) has got for baseEntIDList, in election election.
    return baseEntIDList.map(function (entID) {
      const baseResult = election.getResult(entID);
      if (!baseResult) {
        return 0.0;
      }
      return baseResult.partyToVotes.partyToPVotesSorted[partyID] || 0.0;
    });
  }

  static getFeatureMatrixForElection(modelElection, baseEntIDList) {
    // Returns a matrix, where each row is getFeatureVector for a party in the election.
    const partyIDList = modelElection.getPartyIDList();
    return partyIDList.map(function (partyID) {
      return ElectionModelFeatureUtils.getFeatureVector(
        modelElection,
        partyID,
        baseEntIDList
      );
    });
  }

  static getFeatureMatrixListForElections(electionHistory, baseEntIDList) {
    // Returns a list of feature matrices, one for each election.
    return electionHistory.elections.map(function (election) {
      return ElectionModelFeatureUtils.getFeatureMatrixForElection(
        election,
        baseEntIDList
      );
    });
  }
  static concatFeatureMatrixList(featureMatrixList) {
    // Concatenates all feature matrices in featureMatrixList.
    return featureMatrixList.reduce(function (X, featureMatrix) {
      return X.concat(featureMatrix);
    }, []);
  }

  static getFeatureMatrix(electionHistory, baseEntIDList) {
    // Concatenates all feature matrices for all the training electionHistory.
    return electionHistory.elections.reduce(function (X, election) {
      return X.concat(
        ElectionModelFeatureUtils.getFeatureMatrixForElection(
          election,
          baseEntIDList
        )
      );
    }, []);
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

  static getXEvaluate(currentElection, releasedEntIDList) {
    return ElectionModelFeatureUtils.getFeatureMatrix(
      ElectionHistory.singletonHistory(currentElection),
      releasedEntIDList
    );
  }
}

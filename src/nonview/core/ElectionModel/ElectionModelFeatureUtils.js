export default class ElectionModelFeatureUtils {
  static getFeatureVector(election, partyID, pdIDList) {
    // Returns a vector with the % of votes party(ID) has got for pdIDList, in election election.
    return pdIDList.map(function (pdID) {
      const pdResult = election.getResult(pdID);
      if (!pdResult) {
        return 0.0;
      }
      return pdResult.partyToVotes.partyToPVotesSorted[partyID] || 0.0;
    });
  }

  static getFeatureMatrixForElection(modelElection, pdIDLIst) {
    // Returns a matrix, where each row is getFeatureVector for a party in the election.
    const partyIDList = modelElection.getPartyIDList();
    return partyIDList.map(function (partyID) {
      return ElectionModelFeatureUtils.getFeatureVector(
        modelElection,
        partyID,
        pdIDLIst
      );
    });
  }

  static getFeatureMatrixListForElections(elections, pdIDList) {
    // Returns a list of feature matrices, one for each election.
    return elections.map(function (election) {
      return ElectionModelFeatureUtils.getFeatureMatrixForElection(
        election,
        pdIDList
      );
    });
  }
  static concatFeatureMatrixList(featureMatrixList) {
    // Concatenates all feature matrices in featureMatrixList.
    return featureMatrixList.reduce(function (X, featureMatrix) {
      return X.concat(featureMatrix);
    }, []);
  }

  static getFeatureMatrix(elections, pdIDList) {
    // Concatenates all feature matrices for all the training elections.
    return elections.reduce(function (X, election) {
      return X.concat(
        ElectionModelFeatureUtils.getFeatureMatrixForElection(
          election,
          pdIDList
        )
      );
    }, []);
  }
}

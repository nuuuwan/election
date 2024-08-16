import { MLModel, MathX } from "../../base";

import Result from "../Result";

const ElectionModelTrainMixin = {
  getPartyIDList(modelElection) {
    // Returns the list of party IDs, where the party has won at least MIN_P votes in the election.
    const MIN_P = 0.01;
    const resultsList = modelElection.pdResultsList;
    const aggrResults = Result.fromList("aggr", resultsList);
    const partyToPVotesSorted = aggrResults.partyToVotes.partyToPVotesSorted;
    return Object.entries(partyToPVotesSorted)
      .filter(function ([partyID, pVotes]) {
        return pVotes >= MIN_P;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  },

  getFeatureVector(election, partyID, pdIDList) {
    // Returns a vector with the % of votes party(ID) has got for pdIDList, in election election.
    return pdIDList.map(function (pdID) {
      const pdResult = election.getResults(pdID);
      if (!pdResult) {
        return 0.0;
      }
      return pdResult.partyToVotes.partyToPVotesSorted[partyID] || 0.0;
    });
  },

  getFeatureMatrixForElection(modelElection, pdIDLIst) {
    // Returns a matrix, where each row is getFeatureVector for a party in the election.
    const partyIDList = ElectionModelTrainMixin.getPartyIDList(modelElection);
    return partyIDList.map(function (partyID) {
      return ElectionModelTrainMixin.getFeatureVector(
        modelElection,
        partyID,
        pdIDLIst
      );
    });
  },

  getFeatureMatrixListForElections(elections, pdIDList) {
    // Returns a list of feature matrices, one for each election.
    return elections.map(function (election) {
      return ElectionModelTrainMixin.getFeatureMatrixForElection(
        election,
        pdIDList
      );
    });
  },

  concatFeatureMatrixList(featureMatrixList) {
    // Concatenates all feature matrices in featureMatrixList.
    return featureMatrixList.reduce(function (X, featureMatrix) {
      return X.concat(featureMatrix);
    }, []);
  },

  getFeatureMatrix(elections, pdIDList) {
    // Concatenates all feature matrices for all the training elections.
    return elections.reduce(function (X, election) {
      return X.concat(
        ElectionModelTrainMixin.getFeatureMatrixForElection(election, pdIDList)
      );
    }, []);
  },
  normalizeSingle(partyToPVotes) {
    const totalPVotes = MathX.sumValues(partyToPVotes);
    return Object.fromEntries(
      Object.entries(partyToPVotes).map(function ([partyID, pVotes]) {
        return [partyID, pVotes / totalPVotes];
      })
    );
  },

  normalize(pdToPartyToVoteInfo) {
    return Object.fromEntries(
      Object.entries(pdToPartyToVoteInfo).map(function ([
        pdID,
        partyToVoteInfo,
      ]) {
        return [pdID, ElectionModelTrainMixin.normalizeSingle(partyToVoteInfo)];
      })
    );
  },

  getPError(Y, yHat) {
    const MIN_P = 0.01;
    const pErrorList = yHat
      .reduce(function (pErrorList, YHat, i) {
        return YHat.reduce(function (pErrorList, yHat, j) {
          const y = Y[i][j];
          if (y >= MIN_P) {
            const error = Math.sqrt(Math.pow(yHat - y, 2)) / y;
            pErrorList.push(error);
          }
          return pErrorList;
        }, pErrorList);
      }, [])
      .sort();

    const n = pErrorList.length;
    return pErrorList[Math.floor(ElectionModelTrainMixin.ERROR_CONF * n)];
  },

  getPErrorEvaluate(XAll, YAll) {
    // Evaluate Error
    const XTrainEvaluate = ElectionModelTrainMixin.concatFeatureMatrixList(
      XAll.slice(0, -1)
    );
    const YTrainEvaluate = ElectionModelTrainMixin.concatFeatureMatrixList(
      YAll.slice(0, -1)
    );
    const canTrainModelEvaluate =
      XTrainEvaluate.length >=
      ElectionModelTrainMixin.MIN_RESULTS_FOR_PREDICTION;

    let modelEvaluate = null;
    if (canTrainModelEvaluate) {
      modelEvaluate = new MLModel(XTrainEvaluate, YTrainEvaluate);
    }
    const XTestEvaluate = ElectionModelTrainMixin.concatFeatureMatrixList(
      XAll.slice(-1)
    );
    const YTestEvaluate = ElectionModelTrainMixin.concatFeatureMatrixList(
      YAll.slice(-1)
    );

    let YHatTestEvaluate = [];
    let pError = ElectionModelTrainMixin.DEFAULT_P_ERROR;
    if (canTrainModelEvaluate) {
      YHatTestEvaluate = XTestEvaluate.map((Xi) => modelEvaluate.predict(Xi));
      pError = ElectionModelTrainMixin.getPError(
        YTestEvaluate,
        YHatTestEvaluate
      );
    }
    return pError;
  },

  trainModel(XAll, YAll) {
    const XTrain = ElectionModelTrainMixin.concatFeatureMatrixList(XAll);
    const YTrain = ElectionModelTrainMixin.concatFeatureMatrixList(YAll);
    const canTrainModel =
      XTrain.length >= ElectionModelTrainMixin.MIN_RESULTS_FOR_PREDICTION;
    if (!canTrainModel) {
      return null;
    }
    return new MLModel(XTrain, YTrain);
  },

  getProjection(model, currentElection, XEvaluate, nonReleasedPDIDList) {
    let YHat = [];
    if (model) {
      YHat = XEvaluate.map((Xi) => model.predict(Xi));
    }

    const partyIDList = ElectionModelTrainMixin.getPartyIDList(currentElection);
    const pdToPartyToPVotes = YHat.reduce(function (pdToPartyToPVotes, Yi, i) {
      const partyID = partyIDList[i];
      return Yi.reduce(function (pdToPartyToPVotes, pVotes, j) {
        const pdID = nonReleasedPDIDList[j];

        if (!pdToPartyToPVotes[pdID]) {
          pdToPartyToPVotes[pdID] = {};
        }
        pdToPartyToPVotes[pdID][partyID] = pVotes;
        return pdToPartyToPVotes;
      }, pdToPartyToPVotes);
    }, {});
    const normPDToPartyToPVotes =
      ElectionModelTrainMixin.normalize(pdToPartyToPVotes);
    return normPDToPartyToPVotes;
  },
};

export default ElectionModelTrainMixin;

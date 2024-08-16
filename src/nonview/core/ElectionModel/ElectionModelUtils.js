import { MLModel, MathX } from "../../base";
import { PartyToVotes, Party } from "../../../nonview/core";

export default class ElectionModelUtils {
  static MIN_RESULTS_FOR_PREDICTION = 1;
  static ERROR_CONF = 0.7;
  static DEFAULT_P_ERROR = 0.2;

  static getFeatureVector(election, partyID, pdIDList) {
    // Returns a vector with the % of votes party(ID) has got for pdIDList, in election election.
    return pdIDList.map(function (pdID) {
      const pdResult = election.getResults(pdID);
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
      return ElectionModelUtils.getFeatureVector(
        modelElection,
        partyID,
        pdIDLIst
      );
    });
  }

  static getFeatureMatrixListForElections(elections, pdIDList) {
    // Returns a list of feature matrices, one for each election.
    return elections.map(function (election) {
      return ElectionModelUtils.getFeatureMatrixForElection(election, pdIDList);
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
        ElectionModelUtils.getFeatureMatrixForElection(election, pdIDList)
      );
    }, []);
  }
  static normalizeSingle(partyToPVotes) {
    const totalPVotes = MathX.sumValues(partyToPVotes);
    return Object.fromEntries(
      Object.entries(partyToPVotes).map(function ([partyID, pVotes]) {
        return [partyID, pVotes / totalPVotes];
      })
    );
  }

  static normalize(pdToPartyToVoteInfo) {
    return Object.fromEntries(
      Object.entries(pdToPartyToVoteInfo).map(function ([
        pdID,
        partyToVoteInfo,
      ]) {
        return [pdID, ElectionModelUtils.normalizeSingle(partyToVoteInfo)];
      })
    );
  }

  static getPError(Y, yHat) {
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
    return pErrorList[Math.floor(ElectionModelUtils.ERROR_CONF * n)];
  }

  static getPErrorEvaluate(XAll, YAll) {
    // Evaluate Error
    const XTrainEvaluate = ElectionModelUtils.concatFeatureMatrixList(
      XAll.slice(0, -1)
    );
    const YTrainEvaluate = ElectionModelUtils.concatFeatureMatrixList(
      YAll.slice(0, -1)
    );
    const canTrainModelEvaluate =
      XTrainEvaluate.length >= ElectionModelUtils.MIN_RESULTS_FOR_PREDICTION;

    let modelEvaluate = null;
    if (canTrainModelEvaluate) {
      modelEvaluate = new MLModel(XTrainEvaluate, YTrainEvaluate);
    }
    const XTestEvaluate = ElectionModelUtils.concatFeatureMatrixList(
      XAll.slice(-1)
    );
    const YTestEvaluate = ElectionModelUtils.concatFeatureMatrixList(
      YAll.slice(-1)
    );

    let YHatTestEvaluate = [];
    let pError = ElectionModelUtils.DEFAULT_P_ERROR;
    if (canTrainModelEvaluate) {
      YHatTestEvaluate = XTestEvaluate.map((Xi) => modelEvaluate.predict(Xi));
      pError = ElectionModelUtils.getPError(YTestEvaluate, YHatTestEvaluate);
    }
    return pError;
  }

  static trainModel(XAll, YAll) {
    const XTrain = ElectionModelUtils.concatFeatureMatrixList(XAll);
    const YTrain = ElectionModelUtils.concatFeatureMatrixList(YAll);
    const canTrainModel =
      XTrain.length >= ElectionModelUtils.MIN_RESULTS_FOR_PREDICTION;
    if (!canTrainModel) {
      return null;
    }
    return new MLModel(XTrain, YTrain);
  }

  static getProjection(model, currentElection, XEvaluate, nonReleasedPDIDList) {
    let YHat = [];
    if (model) {
      YHat = XEvaluate.map((Xi) => model.predict(Xi));
    }

    const partyIDList = currentElection.getPartyIDList();
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
      ElectionModelUtils.normalize(pdToPartyToPVotes);
    return normPDToPartyToPVotes;
  }

  static getSimulatedResult(lastElection, pdID, normPDToPartyToPVotes, pError) {
    // We assume the summary from the last election is valid.
    if (!lastElection) {
      return null;
    }
    let result = JSON.parse(JSON.stringify(lastElection.getResults(pdID)));
    if (!result) {
      return null;
    }
    const valid = result.summary.valid;
    const partyToPVotes = normPDToPartyToPVotes[pdID];

    const partyToVotes = Object.entries(partyToPVotes).reduce(
      function (partyToVotes, [partyID, pVotes]) {
        pVotes = MathX.forceRange(pVotes, 0, 1);
        const votes = Math.round(pVotes * valid);

        const kError = Math.max(0, 1 - pError);
        const votesMin = Math.round(pVotes * kError * valid);
        partyToVotes[partyID] = votesMin;
        partyToVotes[Party.UNCERTAIN.id] += votes - votesMin;
        return partyToVotes;
      },
      { [Party.UNCERTAIN.id]: 0 }
    );

    result.partyToVotes = new PartyToVotes(partyToVotes);
    return result;
  }
}

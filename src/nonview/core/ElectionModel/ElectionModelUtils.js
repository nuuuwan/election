import { MLModel, MathX } from "../../base";
import { PartyToVotes, Party, Summary, Result } from "../../../nonview/core";
import ElectionModelFeatureUtils from "./ElectionModelFeatureUtils";

export default class ElectionModelUtils {
  static MIN_RESULTS_FOR_PREDICTION = 1;
  static ERROR_CONF = 0.7;
  static DEFAULT_P_ERROR = 0.2;

 
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
    const XTrainEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      XAll.slice(0, -1)
    );
    const YTrainEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      YAll.slice(0, -1)
    );
    const canTrainModelEvaluate =
      XTrainEvaluate.length >= ElectionModelUtils.MIN_RESULTS_FOR_PREDICTION;

    let modelEvaluate = null;
    if (canTrainModelEvaluate) {
      modelEvaluate = new MLModel(XTrainEvaluate, YTrainEvaluate);
    }
    const XTestEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
      XAll.slice(-1)
    );
    const YTestEvaluate = ElectionModelFeatureUtils.concatFeatureMatrixList(
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
    const XTrain = ElectionModelFeatureUtils.concatFeatureMatrixList(XAll);
    const YTrain = ElectionModelFeatureUtils.concatFeatureMatrixList(YAll);
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

  static getSimulatedSummary(pdID, lastElection, lastElectionOfSameType) {
    const resultLastSameType = lastElectionOfSameType.getResult(pdID);
    if (!resultLastSameType) {
      return null;
    }
    const resultLast = lastElection.getResult(pdID);
    const summaryLast = resultLast.summary;
    const summaryLastSameType = resultLastSameType.summary;

    const electors = summaryLast.electors;
    const polled = summaryLast.polled;
    const rejected = Math.round(
      summaryLast.polled * summaryLastSameType.pRejected
    );
    const valid = polled - rejected;

    return new Summary(valid, rejected, polled, electors);
  }

  static getSimulatedPartyToVotes(
    pdID,
    summary,
    normPDToPartyToPVotes,
    pError
  ) {
    const valid = summary.valid;
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
    return new PartyToVotes(partyToVotes);
  }

  static getSimulatedResult(
    lastElection,
    lastElectionOfSameType,
    pdID,
    normPDToPartyToPVotes,
    pError
  ) {
    // We assume the summary from the last election is valid.
    if (!lastElection) {
      return null;
    }

    const summary = ElectionModelUtils.getSimulatedSummary(
      pdID,
      lastElection,
      lastElectionOfSameType
    );
    if (!summary) {
      return null;
    }

    const partyToVotes = ElectionModelUtils.getSimulatedPartyToVotes(
      pdID,
      summary,
      normPDToPartyToPVotes,
      pError
    );

    return new Result(pdID, summary, partyToVotes);
  }
}

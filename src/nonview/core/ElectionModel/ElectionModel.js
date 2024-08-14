import { MLModel, MathX } from "../../base";
import Election from "../Election/Election";
import Party from "../Party";
import PartyToVotes from "../PartyToVotes";
import Result from "../Result";

export default class ElectionModel {
  static MIN_RESULTS_FOR_PREDICTION = 1;
  static PARTY_UNCERTAIN = Party.UNCERTAIN.id;
  static ERROR_CONF = 0.7;
  static DEFAULT_P_ERROR = 0.2;

  constructor(
    elections,
    currentElection,
    releasedPDIDList,
    notReleasePDIDList
  ) {
    this.elections = elections;
    this.currentElection = currentElection;
    this.releasedPDIDList = releasedPDIDList;
    this.nonReleasedPDIDList = notReleasePDIDList;

    this.trainingOutput = this.train();
  }
  static getPartyIDList(modelElection) {
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
  }

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
    const partyIDList = ElectionModel.getPartyIDList(modelElection);
    return partyIDList.map(function (partyID) {
      return ElectionModel.getFeatureVector(modelElection, partyID, pdIDLIst);
    });
  }

  static getFeatureMatrix(elections, pdIDList) {
    // Concatenates all feature matrices for all the training elections.
    return elections.reduce(function (X, election) {
      return X.concat(
        ElectionModel.getFeatureMatrixForElection(election, pdIDList)
      );
    }, []);
  }

  getPreviousElections() {
    // All elections before currentElection.
    return this.elections.filter(
      (election) => election.localeCompare(this.currentElection) < 0
    );
  }

  getXTrainEvaluate() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections().slice(0, -1),
      this.releasedPDIDList
    );
  }

  getYTrainEvaluate() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections().slice(0, -1),
      this.nonReleasedPDIDList
    );
  }

  getXTestEvaluate() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections().slice(-1),
      this.releasedPDIDList
    );
  }

  getYTestEvaluate() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections().slice(-1),
      this.nonReleasedPDIDList
    );
  }

  getXTrain() {
    const previousElections = this.getPreviousElections();

    return ElectionModel.getFeatureMatrix(
      previousElections,
      this.releasedPDIDList
    );
  }

  getYTrain() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections(),
      this.nonReleasedPDIDList
    );
  }

  getXEvaluate() {
    return ElectionModel.getFeatureMatrix(
      [this.currentElection],
      this.releasedPDIDList
    );
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
        return [pdID, ElectionModel.normalizeSingle(partyToVoteInfo)];
      })
    );
  }
  train() {
    // Evaluate Error
    const XTrainEvaluate = this.getXTrainEvaluate();
    const canTrainModelEvaluate =
      XTrainEvaluate.length >= ElectionModel.MIN_RESULTS_FOR_PREDICTION;
    const YTrainEvaluate = this.getYTrainEvaluate();

    let modelEvaluate = null;
    if (canTrainModelEvaluate) {
      modelEvaluate = new MLModel(XTrainEvaluate, YTrainEvaluate);
    }
    const XTestEvaluate = this.getXTestEvaluate();
    const YTestEvaluate = this.getYTestEvaluate();

    let YHatTestEvaluate = [];
    let pError = ElectionModel.DEFAULT_P_ERROR;
    if (canTrainModelEvaluate) {
      YHatTestEvaluate = XTestEvaluate.map((Xi) => modelEvaluate.predict(Xi));

      const MIN_P = 0.01;
      const pErrorList = YHatTestEvaluate.reduce(function (
        pErrorList,
        YHat,
        i
      ) {
        return YHat.reduce(function (pErrorList, yHat, j) {
          const y = YTestEvaluate[i][j];
          if (y >= MIN_P) {
            const error = Math.sqrt(Math.pow(yHat - y, 2)) / y;
            pErrorList.push(error);
          }
          return pErrorList;
        }, pErrorList);
      },
      []).sort();

      const n = pErrorList.length;
      pError = pErrorList[Math.floor(ElectionModel.ERROR_CONF * n)];
    }
    // Train
    const XTrain = this.getXTrain();

    const canTrainModel =
      XTrain.length >= ElectionModel.MIN_RESULTS_FOR_PREDICTION;
    const YTrain = this.getYTrain();

    let model = null;
    let YHat = [];
    const partyIDList = ElectionModel.getPartyIDList(
      this.currentElection,
      this.releasedPDIDList
    );
    if (canTrainModel) {
      model = new MLModel(XTrain, YTrain);

      const XEvaluate = this.getXEvaluate();
      YHat = XEvaluate.map((Xi) => model.predict(Xi));
    }

    const pdToPartyToPVotes = YHat.reduce(
      function (pdToPartyToPVotes, Yi, i) {
        const partyID = partyIDList[i];
        return Yi.reduce(
          function (pdToPartyToPVotes, pVotes, j) {
            const pdID = this.nonReleasedPDIDList[j];

            if (!pdToPartyToPVotes[pdID]) {
              pdToPartyToPVotes[pdID] = {};
            }
            pdToPartyToPVotes[pdID][partyID] = pVotes;
            return pdToPartyToPVotes;
          }.bind(this),
          pdToPartyToPVotes
        );
      }.bind(this),
      {}
    );
    const normPDToPartyToPVotes = ElectionModel.normalize(pdToPartyToPVotes);
    return { normPDToPartyToPVotes, pError };
  }

  getElectionNotReleasedPrediction() {
    const { normPDToPartyToPVotes, pError } = this.trainingOutput;
    const lastElection = this.getPreviousElections().slice(-1)[0];

    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );

    const releasedResultsList = this.releasedPDIDList.map((pdID) =>
      this.currentElection.getResults(pdID)
    );
    const notReleasedResultsList = this.nonReleasedPDIDList
      .map(function (pdID) {
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
            if (votesMin > votes || votesMin < 0) {
              throw new Error("Invalid votesMin", votesMin, votes);
            }

            partyToVotes[partyID] = votesMin;
            partyToVotes[ElectionModel.PARTY_UNCERTAIN] += votes - votesMin;
            return partyToVotes;
          },
          { [ElectionModel.PARTY_UNCERTAIN]: 0 }
        );

        result.partyToVotes = new PartyToVotes(partyToVotes);
        return result;
      })
      .filter((result) => result !== null);

    election.resultsList = [
      ...releasedResultsList,
      ...notReleasedResultsList,
    ].filter((result) => result);
    election.resultsList = Election.expand(election.resultsList);

    election.resultsIdx = Election.buildResultsIdx(election.resultsList);
    election.isLoaded = true;

    return election;
  }
}

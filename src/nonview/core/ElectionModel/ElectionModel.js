import { MLModel, MathX } from "../../base";
import Election from "../Election/Election";
import PartyToVotes from "../PartyToVotes";
import Result from "../Result";

export default class ElectionModel {
  static MIN_RESULTS_FOR_PREDICTION = 1;
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

  getXTrain() {
    return ElectionModel.getFeatureMatrix(
      this.getPreviousElections(),
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

  getYActual() {
    return ElectionModel.getFeatureMatrix(
      [this.currentElection],
      this.nonReleasedPDIDList
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
    const XTrain = this.getXTrain();
    const YTrain = this.getYTrain();

    const model = new MLModel(XTrain, YTrain);

    const XEvaluate = this.getXEvaluate();

    const YHat = XEvaluate.map((Xi) => model.predict(Xi));
    const partyIDList = ElectionModel.getPartyIDList(
      this.currentElection,
      this.releasedPDIDList
    );

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
    return ElectionModel.normalize(pdToPartyToPVotes);
  }

  getElectionNotReleasedPrediction() {
    console.debug("getElectionNotReleasedPrediction");
    const normPDToPartyToPVotes = this.trainingOutput;
    const lastElection = this.getPreviousElections().slice(-1)[0];

    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );

    const releasedResultsList = this.releasedPDIDList.map((pdID) =>
      this.currentElection.getResults(pdID)
    );
    const notReleasedResultsList = this.nonReleasedPDIDList.map(function (
      pdID
    ) {
      let result = lastElection.getResults(pdID);
      const valid = result.summary.valid;
      const partyToPVotes = normPDToPartyToPVotes[pdID];
      const partyToVotes = Object.fromEntries(
        Object.entries(partyToPVotes).map(function ([partyID, pVotes]) {
          return [partyID, Math.round(pVotes * valid)];
        })
      );
      result.partyToVotes = new PartyToVotes(partyToVotes);
      return result;
    });

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

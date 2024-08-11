import { MLModel, MathX } from "../base";
import Election from "./Election/Election";
import PartyToVotes from "./PartyToVotes";
import Result from "./Result";

export default class ElectionModel {
  static MIN_RESULTS_FOR_PREDICTION = 30;
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

    this.train();
  }
  static getPartyIDList(modelElection) {
    const resultsList = modelElection.pdResultsList;
    const aggrResults = Result.fromList("aggr", resultsList);
    const partyToPVotesSorted = aggrResults.partyToVotes.partyToPVotesSorted;
    return Object.entries(partyToPVotesSorted)
      .filter(function ([partyID, pVotes]) {
        return pVotes > 0.05;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  }

  static getFeatureVector(modelElection, partyID, pdIDList) {
    return pdIDList.map(function (pdID) {
      const pdResult = modelElection.getResults(pdID);
      if (!pdResult) {
        return 0.0;
      }
      const partyToPVotesSorted = pdResult.partyToVotes.partyToPVotesSorted;
      return partyToPVotesSorted[partyID] || 0.0;
    });
  }

  static getFeatureMatrixForElection(modelElection, pdIDLIst) {
    return ElectionModel.getPartyIDList(modelElection).map(function (partyID) {
      return ElectionModel.getFeatureVector(modelElection, partyID, pdIDLIst);
    });
  }

  static getFeatureMatrix(elections, pdIDList) {
    return elections.reduce(function (X, election) {
      return X.concat(
        ElectionModel.getFeatureMatrixForElection(election, pdIDList)
      );
    }, []);
  }

  static normalizeSingle(partyToVoteInfo) {
    const totalPVotes = MathX.sum(
      Object.values(partyToVoteInfo).map((x) => x.pVotesPredicted)
    );
    return Object.fromEntries(
      Object.entries(partyToVoteInfo).map(function ([partyID, voteInfo]) {
        voteInfo.pVotesPredicted = voteInfo.pVotesPredicted / totalPVotes;
        return [partyID, voteInfo];
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

  getPreviousElections() {
    return this.elections.filter(
      (election) => election.localeCompare(this.currentElection) < 0
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

  train() {
    const XTrain = this.getXTrain();
    const YTrain = this.getYTrain();

    const model = new MLModel(XTrain, YTrain);

    const XEvaluate = this.getXEvaluate();
    const YActual = this.getYActual();
    const YHat = XEvaluate.map((Xi) => model.predict(Xi));
    const partyIDList = ElectionModel.getPartyIDList(
      this.currentElection,
      this.releasedPDIDList
    );

    const pdToPartyToVoteInfo = YHat.reduce(
      function (pdTopartyToPVotesSorted, Yi, i) {
        const partyID = partyIDList[i];
        return Yi.reduce(
          function (pdTopartyToPVotesSorted, pVotes, j) {
            const pdID = this.nonReleasedPDIDList[j];

            if (!pdTopartyToPVotesSorted[pdID]) {
              pdTopartyToPVotesSorted[pdID] = {};
            }
            pdTopartyToPVotesSorted[pdID][partyID] = {
              pVotesPredicted: pVotes,
              pVotesActual: YActual[i][j],
            };
            return pdTopartyToPVotesSorted;
          }.bind(this),
          pdTopartyToPVotesSorted
        );
      }.bind(this),
      {}
    );

    return ElectionModel.normalize(pdToPartyToVoteInfo);
  }

  getElectionReleased() {
    let election = new Election(
      this.currentElection.electionType,
      this.currentElection.date
    );
    election.resultsList = this.releasedPDIDList
      .map((pdID) => this.currentElection.getResults(pdID))
      .filter((result) => result);
    election.resultsIdx = Election.buildResultsIdx(election.resultsList);
    election.isLoaded = true;
    return election;
  }

  getElectionNotReleasedPrediction() {
    const normPDTopartyToPVotesSorted = this.train();
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
      const partyToPVotesSorted = normPDTopartyToPVotesSorted[pdID];
      const partyToVotes = Object.fromEntries(
        Object.entries(partyToPVotesSorted).map(function ([partyID, voteInfo]) {
          return [partyID, Math.round(voteInfo.pVotesPredicted * valid)];
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

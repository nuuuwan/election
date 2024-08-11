import { Component } from "react";
import { Alert, CircularProgress, Typography } from "@mui/material";
import { Election, ElectionModel } from "../../nonview/core";
import { ResultSingleView } from "../molecules";

export default class PredictionView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { activeElection, iResult } = this.props;
    const elections = await Election.listAll();

    const pdResultsList = activeElection.pdResultsList;
    const releasedPDIDList = pdResultsList
      .slice(0, iResult)
      .map((result) => result.entID);
    const notReleasePDIDList = pdResultsList
      .slice(iResult)
      .map((result) => result.entID);

    let error;
    if (releasedPDIDList.length < ElectionModel.MIN_RESULTS_FOR_PREDICTION) {
      error = `Need at least ${ElectionModel.MIN_RESULTS_FOR_PREDICTION} results to make a projection.`;
    }
    if (notReleasePDIDList.length < 1) {
      error = `All results have been released.`;
    }

    let resultsLK;
    if (!error) {
      const electionModel = new ElectionModel(
        elections,
        activeElection,
        releasedPDIDList,
        notReleasePDIDList
      );

      const predictedElection =
        electionModel.getElectionNotReleasedPrediction();
      resultsLK = predictedElection.resultsIdx["LK"];
    }
    this.setState({ resultsLK, error });
  }

  render() {
    const { resultsLK, error } = this.state;
    if (error) {
      return (
        <Alert severity="error">
          <Typography variant="body1"> {error}</Typography>
        </Alert>
      );
    }
    if (!resultsLK) {
      return <CircularProgress />;
    }
    return <ResultSingleView result={resultsLK} superTitle="Projected Final" />;
  }
}

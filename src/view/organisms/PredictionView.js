import { Component } from "react";
import { Alert, CircularProgress, Stack } from "@mui/material";
import { Election, ElectionModel } from "../../nonview/core";
import { FinalOutcomeView, ResultSingleView } from "../molecules";

export default class PredictionView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { activeElection, iResult } = this.props;
    const elections = await Election.listAll();

    const pdResultsList = activeElection.pdResultsList;
    if (pdResultsList.length === 0) {
      return;
    }

    const releasedPDIDList = pdResultsList
      .slice(0, iResult + 1)
      .map((result) => result.entID);
    const notReleasePDIDList = pdResultsList
      .slice(iResult + 1)
      .map((result) => result.entID);

    let resultsLK = undefined;
    let error = undefined;
    try {
      const electionModel = new ElectionModel(
        elections,
        activeElection,
        releasedPDIDList,
        notReleasePDIDList
      );
      const predictedElection =
        electionModel.getElectionNotReleasedPrediction();
      resultsLK = predictedElection.resultsIdx["LK"];
    } catch (error0) {
      error = error0;
    }

    this.setState({ resultsLK, error });
  }

  render() {
    const { resultsLK, error } = this.state;

    if (error) {
      return (
        <Alert severity="error" sx={{ fontSize: "100%" }}>
          {error.message}
        </Alert>
      );
    }

    if (!resultsLK) {
      return <CircularProgress />;
    }

    return (
      <Stack direction="column" gap={2}>
        <FinalOutcomeView result={resultsLK} />
        <ResultSingleView result={resultsLK} superTitle="Projected Final" />
      </Stack>
    );
  }
}

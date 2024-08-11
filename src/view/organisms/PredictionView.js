import { Component } from "react";
import { CircularProgress, Stack } from "@mui/material";
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
    const releasedPDIDList = pdResultsList
      .slice(0, iResult + 1)
      .map((result) => result.entID);
    const notReleasePDIDList = pdResultsList
      .slice(iResult + 1)
      .map((result) => result.entID);

    let resultsLK;

    const electionModel = new ElectionModel(
      elections,
      activeElection,
      releasedPDIDList,
      notReleasePDIDList
    );

    const predictedElection = electionModel.getElectionNotReleasedPrediction();
    resultsLK = predictedElection.resultsIdx["LK"];

    this.setState({ resultsLK });
  }

  render() {
    const { resultsLK } = this.state;

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

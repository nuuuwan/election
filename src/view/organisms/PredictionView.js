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
    const { activeElection, nResultsDisplay } = this.props;
    const elections = await Election.listAll();

    const pdResultsList = activeElection.pdResultsList;
    if (pdResultsList.length === 0) {
      return null;
    }

    const releasedPDIDList = pdResultsList
      .slice(0, nResultsDisplay + 1)
      .map((result) => result.entID);
    const notReleasePDIDList = pdResultsList
      .slice(nResultsDisplay + 1)
      .map((result) => result.entID);

    const electionIsComplete = notReleasePDIDList.length === 0;

    let resultsLK = undefined;
    if (!electionIsComplete) {
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

    this.setState({ resultsLK, electionIsComplete });
  }

  render() {
    const { activeElection } = this.props;
    const { resultsLK, electionIsComplete } = this.state;

    if (electionIsComplete) {
      return (
        <FinalOutcomeView
          result={activeElection.resultsIdx["LK"]}
          final={true}
        />
      );
    }

    if (!resultsLK) {
      return <CircularProgress />;
    }

    return (
      <Stack direction="column" gap={0}>
        <ResultSingleView result={resultsLK} superTitle="Projected Final" />
        <FinalOutcomeView result={resultsLK} />
      </Stack>
    );
  }
}

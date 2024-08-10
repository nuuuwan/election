import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election } from "../../nonview/core";
import ResultSingleView from "../molecules/ResultSingleView";
import BottomNavigationCustom from "../molecules/BottomNavigationCustom";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "parliamentary",
    date: "2020-08-05",
    iResult: 0,
  };
  constructor(props) {
    super(props);

    this.state = BasePage.DEFAULT_STATE;
  }

  setIResult(iResult) {
    const { election } = this.state;
    const result = election.resultsList[iResult];
    this.setState({ iResult, result });
  }

  gotoNextResult() {
    const { iResult } = this.state;
    const iResultNext = iResult + 1;
    this.setIResult(iResultNext);
  }

  async componentDidMount() {
    const { electionType, date, iResult } = this.state;

    const election = await Election.fromElectionTypeAndDate(electionType, date);
    const result = election.resultsList[iResult];
    const resultLK = election.resultsIdx["LK"];
    this.setState({ election, result, resultLK });
  }

  renderHeader() {
    const { election, iResult } = this.state;
    return (
      <Stack direction="column">
        <Typography variant="h6">{election.titleShort}</Typography>
        <Stack direction="row" sx={{ margin: "auto" }}>
          <Typography variant="h4">{iResult + 1}</Typography>
          <Typography variant="h4" color="#888">
            /{election.pdResultsList.length}
          </Typography>
        </Stack>
      </Stack>
    );
  }

  renderLeft() {
    return <Typography variant="h6">(Map)</Typography>;
  }

  renderCenter() {
    const { result } = this.state;
    return (
      <Typography variant="h6">
        <ResultSingleView result={result} />
      </Typography>
    );
  }

  renderRight() {
    const { resultLK } = this.state;
    return (
      <Typography variant="h6">
        <ResultSingleView result={resultLK} />
      </Typography>
    );
  }

  renderFooter() {
    return (
      <Box>
        <Typography variant="caption">
          visualization & analysis by @nuuuwan
        </Typography>
        <BottomNavigationCustom
          gotoNextResult={this.gotoNextResult.bind(this)}
        />
      </Box>
    );
  }

  render() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <Box sx={{ textAlign: "center" }}>
        {this.renderHeader()}
        <Stack direction="row">
          <Box sx={{ width: "33%" }}> {this.renderLeft()}</Box>
          <Box sx={{ width: "34%" }}> {this.renderCenter()}</Box>
          <Box sx={{ width: "33%" }}> {this.renderRight()}</Box>
        </Stack>
        <Box
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0, zindex: 1000 }}
        >
          {this.renderFooter()}
        </Box>
      </Box>
    );
  }
}

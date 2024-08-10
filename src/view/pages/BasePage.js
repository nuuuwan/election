import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election } from "../../nonview/core";
import ResultSingleView from "../molecules/ResultSingleView";
import BottomNavigationCustom from "../molecules/BottomNavigationCustom";

export default class BasePage extends Component {
  constructor(props) {
    super(props);

    const date = undefined;
    const iResult = undefined;
    const election = undefined;
    const result = undefined;
    const resultLK = undefined;

    this.state = {
      date,
      iResult,
      election,
      result,
      resultLK,
    };
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
    let { iResult, date } = this.state;

    if (!date) {
      const elections = await Election.listAll();
      date = Election.getLastElection(elections).date;
    }
    iResult = iResult || 0;

    const election = await Election.fromDate(date);
    const result = election.resultsList[iResult];
    const resultLK = election.resultsIdx["LK"];

    this.setState({ date, iResult, election, result, resultLK });
  }

  renderHeader() {
    const { election } = this.state;
    return (
      <Stack direction="column">
        <Typography variant="h6">{election.date} Election</Typography>{" "}
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

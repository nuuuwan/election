import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election, Result } from "../../nonview/core";
import {
  ResultSingleView,
  BottomNavigationCustom,
  HexagonMap,
} from "../molecules";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2019-11-16",
  };
  constructor(props) {
    super(props);

    this.state = BasePage.DEFAULT_STATE;
  }

  get result() {
    const { election, iResult } = this.state;
    return election.pdResultsList[iResult];
  }

  get resultList() {
    const { election, iResult } = this.state;
    return election.pdResultsList.slice(0, iResult + 1);
  }

  get resultIdx() {
    return Object.fromEntries(
      this.resultList.map((result) => [result.entID, result])
    );
  }
  get resultLK() {
    return Result.fromList("LK", this.resultList);
  }

  setIResult(iResult) {
    const { election } = this.state;
    const result = election.pdResultsList[iResult];
    this.setState({ iResult, result });
  }

  gotoNextResult() {
    const { iResult } = this.state;
    const iResultNext = iResult - 1;
    this.setIResult(iResultNext);
  }

  async componentDidMount() {
    const { electionType, date } = this.state;

    const election = await Election.fromElectionTypeAndDate(electionType, date);
    const iResult = election.pdResultsList.length - 1;

    this.setState({ election, iResult });
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
    return <HexagonMap resultIdx={this.resultIdx} result={this.result} />;
  }

  renderCenter() {
    return (
      <Box>
        <ResultSingleView result={this.result} />
        <Typography variant="caption">
          visualization & analysis by @nuuuwan
        </Typography>
      </Box>
    );
  }

  renderRight() {
    return (
      <Box>
        <ResultSingleView result={this.resultLK} />
      </Box>
    );
  }

  renderFooter() {
    return (
      <Box
        sx={{
          position: "fixed",
          height: 60,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
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
        {this.renderFooter()}
      </Box>
    );
  }
}

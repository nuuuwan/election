import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election, Result } from "../../nonview/core";
import {
  ResultSingleView,
  BottomNavigationCustom,
  HexagonMap,
} from "../molecules";
import { STYLE } from "../../nonview/constants";

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

  get nResults() {
    const { election } = this.state;
    return election.pdResultsList.length;
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
    const { election } = this.state;
    return (
      <Typography variant="h3" color="#ccc">
        {election.titleShort}
      </Typography>
    );
  }

  renderFarLeft() {
    return <HexagonMap resultIdx={this.resultIdx} result={this.result} />;
  }

  renderCenterLeft() {
    return (
      <Box>
        <ResultSingleView result={this.result} superTitle="Final" />
        <Typography variant="caption">
          visualization & analysis by @nuuuwan
        </Typography>
      </Box>
    );
  }

  renderCenterRight() {
    const { iResult } = this.state;
    console.debug(iResult, this.nResults);
    const superTitle =
      this.nResults === iResult + 1
        ? "Final"
        : `${iResult + 1}/${this.nResults} Released`;
    return (
      <Box key={iResult}>
        <ResultSingleView result={this.resultLK} superTitle={superTitle} />
      </Box>
    );
  }

  renderFarRight() {
    return null;
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

    const width = STYLE.PCT_COLUMN_WIDTH;
    return (
      <Box sx={{ textAlign: "center" }}>
        {this.renderHeader()}
        <Stack direction="row">
          <Box sx={{ width }}> {this.renderFarLeft()}</Box>
          <Box sx={{ width }}> {this.renderCenterLeft()}</Box>
          <Box sx={{ width }}> {this.renderCenterRight()}</Box>{" "}
          <Box sx={{ width }}> {this.renderFarRight()}</Box>
        </Stack>
        {this.renderFooter()}
      </Box>
    );
  }
}

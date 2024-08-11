import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election, Result } from "../../nonview/core";
import {
  ResultSingleView,
  BottomNavigationCustom,
  HexagonMap,
} from "../molecules";
import { STYLE, VERSION } from "../../nonview/constants";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2015-01-08",
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

  gotoFirstResult() {
    this.setIResult(0);
  }

  gotoPreviousResult() {
    const { iResult } = this.state;
    const iResultNext = iResult - 1;
    this.setIResult(iResultNext);
  }

  gotoNextResult() {
    const { iResult } = this.state;
    const iResultNext = iResult + 1;
    this.setIResult(iResultNext);
  }

  gotoLastResult() {
    const { election } = this.state;
    const iResult = election.pdResultsList.length - 1;
    this.setIResult(iResult);
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
      <Box color="#ccc">
        <Typography variant="h4">{election.titleShort}</Typography>
      </Box>
    );
  }

  renderFarLeft() {
    return <HexagonMap resultIdx={this.resultIdx} result={this.result} />;
  }

  renderCenterLeft() {
    return (
      <Box>
        <ResultSingleView result={this.result} superTitle="Final" />
      </Box>
    );
  }

  renderCenterRight() {
    const { iResult } = this.state;

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

  renderBodyFooter() {
    return (
      <Box color="#ccc">
        <Typography variant="h6">Source Data by elections.gov.lk</Typography>
        <Typography variant="h6">
          Visualization & Analysis by @nuuuwan
        </Typography>
        <Typography variant="caption">
          App Last Updated at {VERSION.DATETIME_STR}
        </Typography>
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
          gotoFirstResult={this.gotoFirstResult.bind(this)}
          gotoNextResult={this.gotoNextResult.bind(this)}
          gotoPreviousResult={this.gotoPreviousResult.bind(this)}
          gotoLastResult={this.gotoLastResult.bind(this)}
          iResult={this.state.iResult}
          nResults={this.nResults}
        />
      </Box>
    );
  }

  renderMultiColumn() {
    const width = STYLE.PCT_COLUMN_WIDTH;
    return (
      <Box>
        <Box sx={{ marginBottom: STYLE.FOOTER_HEIGHT }}>
          {this.renderHeader()}
          <Stack direction="row">
            <Box sx={{ width }}> {this.renderFarLeft()}</Box>
            <Box sx={{ width }}> {this.renderCenterLeft()}</Box>
            <Box sx={{ width }}> {this.renderCenterRight()}</Box>{" "}
            <Box sx={{ width }}> {this.renderFarRight()}</Box>
          </Stack>
          {this.renderBodyFooter()}
        </Box>
        {this.renderFooter()}
      </Box>
    );
  }

  renderSingleColumn() {
    return (
      <Box>
        {this.renderHeader()}
        {this.renderCenterLeft()}
        {this.renderFooter()}
      </Box>
    );
  }

  renderInner() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    if (STYLE.ASPECT_RATIO > 1.5) {
      return this.renderMultiColumn();
    }
    return this.renderSingleColumn();
  }

  render() {
    return <Box sx={{ textAlign: "center" }}>{this.renderInner()}</Box>;
  }
}

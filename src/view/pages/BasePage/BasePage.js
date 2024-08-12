import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election, Result } from "../../../nonview/core";
import {
  ResultSingleView,
  HexagonMap,
  BottomNavigationSingleColumnMode,
  ElectionSelector,
  PDSelector,
} from "../../molecules";
import { STYLE, VERSION } from "../../../nonview/constants";
import SingleColumnMode from "./SingleColumnMode";
import PredictionView from "../../organisms/PredictionView";
import { FutureElection } from "../../atoms";
import { Ent, EntType } from "../../../nonview/base";
export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2005-11-17",
    singleColumnMode: SingleColumnMode.MAP,
  };
  constructor(props) {
    super(props);

    this.state = BasePage.DEFAULT_STATE;
  }
  get resultsList() {
    const { election, iResult } = this.state;
    return election.pdResultsList.slice(0, iResult + 1);
  }

  get resultsIdx() {
    return Object.fromEntries(
      this.resultsList.map((result) => [result.entID, result])
    );
  }
  get result() {
    const { activePDID } = this.state;
    return this.resultsIdx[activePDID];
  }

  get resultLK() {
    return Result.fromList("LK", this.resultsList);
  }

  get nResults() {
    const { election } = this.state;
    return election.pdResultsList.length;
  }

  get key() {
    const { electionType, date, activePDID } = this.state;
    return `${electionType}-${date}-${activePDID}`;
  }

  async setElection(electionType, date) {
    let { activePDID, iResult } = this.state;
    const election = await Election.fromElectionTypeAndDate(electionType, date);

    if (!election.isFuture) {
      iResult = election.pdResultsList.length - 1;
      if (!election.resultsIdx[activePDID]) {
        activePDID = election.pdResultsList[iResult].entID;
      }
    }

    this.setState({ electionType, date, iResult, activePDID, election });
  }

  setActivePDID(activePDID) {
    this.setState({ activePDID });
  }

  setIResult(iResult) {
    this.setState({ iResult });
  }

  setSingleColumnMode(singleColumnMode) {
    this.setState({ singleColumnMode });
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
    const activePDID = election.pdResultsList[iResult].entID;

    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const elections = await Election.listAll();

    this.setState({ election, iResult, activePDID, pdIdx, edIdx, elections });
  }

  renderHeader() {
    const { election, elections } = this.state;
    return (
      <Box color="#ccc">
        <ElectionSelector
          selectedElection={election}
          elections={elections}
          setElection={this.setElection.bind(this)}
        />
      </Box>
    );
  }

  renderColumnMap() {
    const { pdIdx } = this.state;
    return (
      <HexagonMap
        resultsIdx={this.resultsIdx}
        pdIdx={pdIdx}
        activeResult={this.result}
      />
    );
  }

  renderColumnResult() {
    const { activePDID, pdIdx, edIdx } = this.state;
    return (
      <Box>
        <PDSelector
          resultsIdx={this.resultsIdx}
          activePDID={activePDID}
          pdIdx={pdIdx}
          edIdx={edIdx}
          setActivePDID={this.setActivePDID.bind(this)}
        />
        <ResultSingleView result={this.result} superTitle={"Result"} />{" "}
        <Box
          sx={{
            position: "fixed",
            height: 60,
            bottom: 55,
            left: 0,
            right: 0,
            zIndex: 1000,
            m: 0,
            p: 0,
          }}
        ></Box>
      </Box>
    );
  }

  renderColumnLKResult() {
    return (
      <Box>
        <Typography variant="h6">Aggregated Result</Typography>
        <Typography variant="h3">Sri Lanka</Typography>
        <ResultSingleView result={this.resultLK} superTitle={"Aggregated"} />
      </Box>
    );
  }

  renderColumnPrediction() {
    const { election, iResult } = this.state;
    return (
      <Box>
        <Typography variant="h6">Projected Final Result</Typography>
        <Typography variant="h3">Sri Lanka</Typography>
        <PredictionView
          key={iResult}
          activeElection={election}
          iResult={iResult}
        />{" "}
      </Box>
    );
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
    const { singleColumnMode } = this.state;
    return (
      <Box
        sx={{
          position: "fixed",
          height: 60,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          m: 0,
          p: 0,
        }}
      >
        <BottomNavigationSingleColumnMode
          selectedSingleColumnMode={singleColumnMode}
          setSingleColumnMode={this.setSingleColumnMode.bind(this)}
        />
      </Box>
    );
  }

  renderMultiColumnBody() {
    const { election } = this.state;
    if (election.isFuture) {
      return <FutureElection election={election} />;
    }
    const width = STYLE.PCT_COLUMN_WIDTH;
    return (
      <Stack direction="row">
        <Box sx={{ width }}> {this.renderColumnMap()}</Box>
        <Box sx={{ width }}> {this.renderColumnResult()}</Box>
        <Box sx={{ width }}> {this.renderColumnLKResult()}</Box>{" "}
        <Box sx={{ width }}> {this.renderColumnPrediction()}</Box>
      </Stack>
    );
  }

  renderMultiColumn() {
    return (
      <Box key={this.key}>
        {this.renderHeader()}
        {this.renderBodyFooter()}
        {this.renderMultiColumnBody()}
      </Box>
    );
  }

  renderSingleColumnBody() {
    const { singleColumnMode } = this.state;
    return singleColumnMode.getRenderer(this);
  }

  renderSingleColumn() {
    return (
      <Box key={this.key}>
        {this.renderHeader()}
        {this.renderSingleColumnBody()}
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

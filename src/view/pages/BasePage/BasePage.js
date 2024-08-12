import { Component } from "react";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { Election, Result } from "../../../nonview/core";
import {
  ResultSingleView,
  HexagonMap,
  BottomNavigationSingleColumnMode,
  ElectionSelector,
  PDSelector,
  PlayerControl,
} from "../../molecules";
import { STYLE, VERSION } from "../../../nonview/constants";
import SingleColumnMode from "./SingleColumnMode";
import PredictionView from "../../organisms/PredictionView";
import { FutureElection } from "../../atoms";
import { Ent, EntType } from "../../../nonview/base";
export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2015-01-08",
    singleColumnMode: SingleColumnMode.MAP,
  };
  constructor(props) {
    super(props);

    this.state = BasePage.DEFAULT_STATE;
  }
  get resultsList() {
    const { election, nResultsDisplay } = this.state;
    return election.pdResultsList.slice(0, nResultsDisplay);
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
    let { activePDID, nResultsDisplay } = this.state;
    const election = await Election.fromElectionTypeAndDate(electionType, date);

    if (!election.isFuture) {
      nResultsDisplay = election.pdResultsList.length;
      if (!election.resultsIdx[activePDID]) {
        activePDID = election.pdResultsList[nResultsDisplay - 1].entID;
      }
    }

    this.setState({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      election,
    });
  }

  setActivePDID(activePDID) {
    this.setState({ activePDID });
  }

  setNResultsDisplay(nResultsDisplay) {
    const { election } = this.state;
    const pdIDs = election.pdResultsList.map((pdResult) => pdResult.entID);
    const activePDID = pdIDs[nResultsDisplay - 1];

    this.setState({ nResultsDisplay, activePDID });
  }

  setSingleColumnMode(singleColumnMode) {
    this.setState({ singleColumnMode });
  }

  async componentDidMount() {
    const timerID = "⚡[Expensive] BasePage.componentDidMount";
    console.time(timerID);

    const { electionType, date } = this.state;

    const election = await Election.fromElectionTypeAndDate(electionType, date);
    const nResultsDisplay = election.pdResultsList.length;
    const activePDID = election.pdResultsList[nResultsDisplay - 1].entID;

    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const elections = await Election.listAll();

    this.setState({
      election,
      nResultsDisplay,
      activePDID,
      pdIdx,
      edIdx,
      elections,
    });
    console.timeEnd(timerID);
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
        <Typography variant="body1">Aggregated Result</Typography>
        <Typography variant="h4">Sri Lanka</Typography>
        <ResultSingleView result={this.resultLK} superTitle={"Aggregated"} />
      </Box>
    );
  }

  renderColumnPrediction() {
    const { election, nResultsDisplay } = this.state;
    return (
      <Box>
        <Typography variant="body1">Projected Final Result</Typography>
        <Typography variant="h4">Sri Lanka</Typography>
        <PredictionView
          key={nResultsDisplay}
          activeElection={election}
          nResultsDisplay={nResultsDisplay}
        />{" "}
      </Box>
    );
  }

  renderBodyFooter() {
    return (
      <Box color="#ccc">
        <Typography variant="body1">Source Data by elections.gov.lk</Typography>
        <Typography variant="body1">
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
    const { election, nResultsDisplay } = this.state;
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
        <PlayerControl
          setNResultsDisplay={this.setNResultsDisplay.bind(this)}
          nResultsDisplay={nResultsDisplay}
          nResults={this.nResults}
        />
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
    return <Box>{singleColumnMode.getRenderer(this)}</Box>;
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

    if (STYLE.IS_MULTI_COLUMN) {
      return this.renderMultiColumn();
    }
    return this.renderSingleColumn();
  }

  render() {
    return <Box sx={{ textAlign: "center" }}>{this.renderInner()}</Box>;
  }
}

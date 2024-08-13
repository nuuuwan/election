import { Component } from "react";
import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { Election, Result } from "../../../nonview/core";
import {
  ResultSingleView,
  HexagonMap,
  ElectionSelector,
  PDSelector,
  PlayerControl,
} from "../../molecules";
import { STYLE, VERSION } from "../../../nonview/constants";

import PredictionView from "../../organisms/PredictionView";
import { FutureElection } from "../../atoms";
import { Ent, EntType } from "../../../nonview/base";
export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2015-01-08",
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

  async setElection(election0) {
    let { activePDID, nResultsDisplay } = this.state;

    const { electionType, date } = election0;
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
    const i = this.resultsList.findIndex(
      (result) => result.entID === activePDID
    );
    const nResultsDisplay = i + 1;
    this.setState({ activePDID, nResultsDisplay });
  }

  setNResultsDisplay(nResultsDisplay) {
    const { election } = this.state;
    const pdIDs = election.pdResultsList.map((pdResult) => pdResult.entID);
    const activePDID = pdIDs[nResultsDisplay - 1];

    this.setState({ nResultsDisplay, activePDID });
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
      <Box
        sx={{
          position: "fixed",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 3000,
          backgroundColor: "white",
        }}
      >
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
        setActivePDID={this.setActivePDID.bind(this)}
      />
    );
  }

  renderColumnResult() {
    const { activePDID, pdIdx, edIdx } = this.state;
    return (
      <Box>
        <Box sx={{ height: 70 }}>
          <PDSelector
            resultsIdx={this.resultsIdx}
            activePDID={activePDID}
            pdIdx={pdIdx}
            edIdx={edIdx}
            setActivePDID={this.setActivePDID.bind(this)}
          />
        </Box>
        <ResultSingleView result={this.result} superTitle={"Result"} />{" "}
      </Box>
    );
  }

  renderColumnLKResult() {
    const { nResultsDisplay } = this.state;
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={{ height: 70 }}>
          <Typography variant="body1">
            After {nResultsDisplay} Results
          </Typography>
          <Typography variant="h4">Islandwide</Typography>
        </Box>
        <ResultSingleView result={this.resultLK} superTitle={"Aggregated"} />
      </Box>
    );
  }

  renderColumnPrediction() {
    const { election, nResultsDisplay } = this.state;
    return (
      <Box color={STYLE.COLOR.DARK}>
        <Box sx={{ height: 70 }}>
          <Typography variant="body1">Projected Final Result</Typography>
          <Typography variant="h4">Sri Lanka</Typography>
        </Box>
        <PredictionView
          key={nResultsDisplay}
          activeElection={election}
          nResultsDisplay={nResultsDisplay}
        />
      </Box>
    );
  }

  renderCitations() {
    return (
      <Box
        sx={{ color: STYLE.COLOR.LIGHTER, textAlign: "center", margin: "auto" }}
      >
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

  renderBody() {
    return (
      <Box
        sx={{
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {this.renderBodyInner()}
      </Box>
    );
  }

  renderBodyInner() {
    const { election, nResultsDisplay } = this.state;
    if (election.isFuture) {
      return <FutureElection election={election} />;
    }

    return (
      <Grid container rowSpacing={5}>
        <Grid item xs={12} md={6} xl={3}>
          {this.renderColumnResult()}
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          {this.renderColumnLKResult()}
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          {this.renderColumnMap()}
        </Grid>

        <Grid item xs={12} md={6} xl={3}>
          {this.renderColumnPrediction()}
        </Grid>

        {this.renderCitations()}
        <PlayerControl
          key={nResultsDisplay}
          setNResultsDisplay={this.setNResultsDisplay.bind(this)}
          nResultsDisplay={nResultsDisplay}
          nResults={this.nResults}
        />
      </Grid>
    );
  }

  renderInner() {
    const { election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <Grid container direction="column">
        <Grid item>{this.renderHeader()}</Grid>
        <Grid item>{this.renderBody()} </Grid>
      </Grid>
    );
  }

  render() {
    return <Box sx={{ textAlign: "center" }}>{this.renderInner()}</Box>;
  }
}

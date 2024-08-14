import { Component } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { Ent, EntType, URLContext } from "../../../nonview/base";
import { STYLE, VERSION } from "../../../nonview/constants";
import { Election, Result } from "../../../nonview/core";
import { FutureElection } from "../../atoms";
import {
  ResultSingleView,
  HexagonMap,
  ElectionSelector,
  PDSelector,
  PlayerControl,
  PredictionView,
} from "../../molecules";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2024-09-21",
    isPlaying: false,
  };
  constructor(props) {
    super(props);
    this.state = Object.assign({}, BasePage.DEFAULT_STATE, this.getContext());
  }

  getContext() {
    let context = URLContext.get();
    if (context.isPlaying === true || context.isPlaying === "true") {
      context.isPlaying = true;
    } else {
      context.isPlaying = false;
    }
    return context;
  }

  setStateAndContext(newState, funcRunAfter = undefined) {
    this.setState(
      newState,
      function () {
        const { electionType, date, isPlaying, activePDID } = this.state;
        URLContext.set({
          electionType,
          date,
          isPlaying,
          activePDID,
        });
        if (funcRunAfter) {
          funcRunAfter();
        }
      }.bind(this)
    );
  }

  async componentDidMount() {
    const timerID = "⚡[Expensive] BasePage.componentDidMount";
    console.time(timerID);

    let { electionType, date, isPlaying, nResultsDisplay, activePDID } =
      this.state;

    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const elections = await Election.listAll();

    const election = await Election.fromElectionTypeAndDate(electionType, date);

    activePDID =
      activePDID ||
      election.pdResultsList[election.pdResultsList.length - 1].entID;

    nResultsDisplay =
      election.pdResultsList.map((result) => result.entID).indexOf(activePDID) +
      1;

    for (const result of election.pdResultsList) {
      const pdID = result.entID;
      if (!pdIdx[pdID]) {
        console.log(pdID);
      }
    }

    this.setStateAndContext({
      electionType,
      date,
      isPlaying,
      nResultsDisplay,
      activePDID,
      // Derived
      election,
      pdIdx,
      edIdx,
      elections,
    });

    console.timeEnd(timerID);
  }

  get pdResultsList() {
    const { election } = this.state;
    return election.pdResultsList;
  }

  get resultsIdx() {
    const { election } = this.state;
    return election.resultsIdx;
  }
  get result() {
    const { activePDID } = this.state;
    return this.resultsIdx[activePDID];
  }

  // Display
  get pdResultsDisplay() {
    const { nResultsDisplay } = this.state;
    return this.pdResultsList.slice(0, nResultsDisplay);
  }

  get resultsIdxDisplay() {
    return Object.fromEntries(
      this.pdResultsDisplay.map((result) => [result.entID, result])
    );
  }

  get resultLKDisplay() {
    return Result.fromList("LK", this.pdResultsDisplay);
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
      if (!election.resultsIdx[activePDID]) {
        activePDID = election.pdResultsList[nResultsDisplay - 1].entID;
      }
      nResultsDisplay =
        election.pdResultsList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    }

    this.setStateAndContext({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      election,
    });
  }

  setActivePDID(activePDID) {
    const nResultsDisplay =
      this.pdResultsList.findIndex((result) => result.entID === activePDID) + 1;
    this.setStateAndContext({ activePDID, nResultsDisplay });
  }

  setNResultsDisplay(nResultsDisplay) {
    const { election } = this.state;
    const pdIDs = election.pdResultsList.map((pdResult) => pdResult.entID);
    const activePDID = pdIDs[nResultsDisplay - 1];

    this.setStateAndContext({ nResultsDisplay, activePDID });
  }

  async playAnimation() {
    this.setStateAndContext(
      { isPlaying: true },
      async function () {
        while (true) {
          if (this.state.isPlaying === false) {
            break;
          }
          if (this.state.nResultsDisplay === this.nResults) {
            this.setState({ isPlaying: false });
            break;
          }
          this.setNResultsDisplay(this.state.nResultsDisplay + 1);
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }
      }.bind(this)
    );
  }

  async pauseAnimation() {
    this.setStateAndContext({ isPlaying: false });
  }

  renderHeader() {
    const { election, elections, nResultsDisplay } = this.state;
    return (
      <Box>
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
        <Box
          sx={{
            position: "fixed",
            top: 0,
            right: 0,
            zIndex: 3000,
            backgroundColor: "white",
            paddingTop: 2,
            paddingRight: 4,
            color: STYLE.COLOR.LIGHTER,
          }}
        >
          <Typography variant="h3">{nResultsDisplay}</Typography>
        </Box>
      </Box>
    );
  }

  renderColumnResult() {
    const { activePDID, pdIdx, edIdx } = this.state;
    if (!activePDID) {
      return (
        <Box>
          <Typography variant="h6">No results released.</Typography>
        </Box>
      );
    }
    return (
      <Box>
        <Box sx={STYLE.BODY_HEADER}>
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

  get subTitleProgress() {
    const { nResultsDisplay } = this.state;
    return nResultsDisplay === this.nResults ? (
      "Final Result"
    ) : (
      <>
        {nResultsDisplay}/{this.nResults} Results Released
      </>
    );
  }

  renderColumnLKResult() {
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={STYLE.BODY_HEADER}>
          <Typography variant="caption">{this.subTitleProgress}</Typography>
          <Typography variant="h4">National</Typography>
        </Box>
        <ResultSingleView
          result={this.resultLKDisplay}
          superTitle={"Aggregated"}
        />
      </Box>
    );
  }

  renderColumnMap() {
    const { pdIdx } = this.state;
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={STYLE.BODY_HEADER}>
          <Typography variant="caption">{this.subTitleProgress}</Typography>
          <Typography variant="h4">Maps</Typography>
        </Box>
        <HexagonMap
          resultsIdx={this.resultsIdxDisplay}
          pdIdx={pdIdx}
          activeResult={this.result}
          setActivePDID={this.setActivePDID.bind(this)}
        />
      </Box>
    );
  }

  renderColumnPrediction() {
    const { election, nResultsDisplay, elections } = this.state;
    return (
      <Box color={STYLE.COLOR.DARK}>
        <Box sx={STYLE.BODY_HEADER}>
          <Typography variant="caption">Projected Final Result</Typography>
          <Typography variant="h4">National</Typography>
        </Box>
        <PredictionView
          activeElection={election}
          nResultsDisplay={nResultsDisplay}
          elections={elections}
        />
      </Box>
    );
  }

  renderCitations() {
    const onClick = function () {
      localStorage.clear();
      window.location.reload();
    };
    return (
      <Box
        sx={{ color: STYLE.COLOR.LIGHTER, textAlign: "center", margin: "auto" }}
      >
        <Typography variant="h6">Source Data by elections.gov.lk</Typography>
        <Typography variant="h6">
          Visualization & Analysis by @nuuuwan
        </Typography>
        <Typography variant="body2">
          App Last Updated at {VERSION.DATETIME_STR}
        </Typography>
        <IconButton onClick={onClick}>
          <Refresh />
        </IconButton>
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
    const { election, nResultsDisplay, isPlaying } = this.state;

    return (
      <Box>
        {election.isFuture ? <FutureElection election={election} /> : null}
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
        </Grid>{" "}
        {this.renderCitations()}
        <PlayerControl
          key={nResultsDisplay}
          nResultsDisplay={nResultsDisplay}
          nResults={this.nResults}
          setNResultsDisplay={this.setNResultsDisplay.bind(this)}
          isPlaying={isPlaying}
          playAnimation={this.playAnimation.bind(this)}
          pauseAnimation={this.pauseAnimation.bind(this)}
        />
      </Box>
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

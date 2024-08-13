import { Component } from "react";
import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Refresh } from "@mui/icons-material";
import { Ent, EntType } from "../../../nonview/base";
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
    date: "2019-11-16",
    isPlaying: false,
  };
  constructor(props) {
    super(props);

    this.state = BasePage.DEFAULT_STATE;
  }

  get resultsListAll() {
    const { election } = this.state;
    return election.pdResultsList;
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
    const i = this.resultsListAll.findIndex(
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

  async playAnimation() {
    this.setState(
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
    this.setState({ isPlaying: false });
  }

  async componentDidMount() {
    const timerID = "⚡[Expensive] BasePage.componentDidMount";
    console.time(timerID);

    const { electionType, date } = this.state;

    const election = await Election.fromElectionTypeAndDate(electionType, date);
    const nResultsDisplay = Math.ceil(election.pdResultsList.length / 2);
    const activePDID = election.pdResultsList[nResultsDisplay - 1].entID;

    const pdIdx = await Ent.idxFromType(EntType.PD);
    const edIdx = await Ent.idxFromType(EntType.ED);
    const elections = await Election.listAll();

    for (const result of election.pdResultsList) {
      const pdID = result.entID;
      if (!pdIdx[pdID]) {
        console.log(pdID);
      }
    }

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
    const title =
      nResultsDisplay === this.nResults ? (
        "Final Result"
      ) : (
        <>
          After {nResultsDisplay}/{this.nResults} Results
        </>
      );
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={{ height: 70 }}>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="h4">Islandwide</Typography>
        </Box>
        <ResultSingleView result={this.resultLK} superTitle={"Aggregated"} />
      </Box>
    );
  }

  renderColumnMap() {
    const { pdIdx } = this.state;
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={{ height: 70 }}>
          <Typography variant="body1">Results Map</Typography>{" "}
          <Typography variant="h4">Polling Divisions</Typography>
        </Box>
        <HexagonMap
          resultsIdx={this.resultsIdx}
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
        <Box sx={{ height: 70 }}>
          <Typography variant="body1">Projected Final Result</Typography>
          <Typography variant="h4">Islandwide</Typography>
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
    if (election.isFuture) {
      return <FutureElection election={election} />;
    }

    return (
      <Box>
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

import { Box, CircularProgress, Grid, Typography } from "@mui/material";

import { STYLE, VERSION } from "../../../nonview/constants";

import {
  ResultSingleView,
  HexagonMap,
  ElectionSelector,
  PlayerControl,
  PredictionView,
  PDSelector,
} from "../../molecules";

const BasePageRenderMixin = {
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
            paddingTop: 1,
            paddingRight: 2,
            color: STYLE.COLOR.LIGHTER,
          }}
        >
          <Typography variant="h6">{nResultsDisplay}</Typography>
        </Box>
      </Box>
    );
  },

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
  },

  renderColumnLKResult() {
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={STYLE.BODY_HEADER}>
          <Typography variant="caption">{this.subTitleProgress}</Typography>
          <Typography variant="h4">Islandwide</Typography>
        </Box>
        <ResultSingleView
          result={this.resultLKDisplay}
          superTitle={"Aggregated"}
        />
      </Box>
    );
  },

  renderColumnMap() {
    const { pdIdx } = this.state;
    return (
      <Box color={STYLE.COLOR.LIGHT}>
        <Box sx={STYLE.BODY_HEADER}>
          <Typography variant="caption">{this.subTitleProgress}</Typography>
          <Typography variant="h4">The Map</Typography>
        </Box>
        <HexagonMap
          resultsIdx={this.resultsIdxDisplay}
          pdIdx={pdIdx}
          activeResult={this.result}
          setActivePDID={this.setActivePDID.bind(this)}
        />
      </Box>
    );
  },

  renderColumnPrediction() {
    const { election, nResultsDisplay, elections, pdIdx } = this.state;
    return (
      <Box color={STYLE.COLOR.DARK}>
        <Box sx={STYLE.BODY_HEADER}>
          <Typography variant="caption">Final Result</Typography>
          <Typography variant="h4">Projected</Typography>
        </Box>
        <PredictionView
          activeElection={election}
          nResultsDisplay={nResultsDisplay}
          elections={elections}
          pdIdx={pdIdx}
        />
      </Box>
    );
  },

  renderCitations() {
    const onClick = function () {
      localStorage.clear();
      window.location.reload();
    };

    const content = [
      "Source Data by elections.gov.lk",
      "Music by @bensound",
      "Visualization & Analysis by @nuuuwan",
      VERSION.DATETIME_STR,
    ].join(" · ");

    return (
      <Box
        sx={{
          color: STYLE.COLOR.LIGHTER,
          alignContent: "center",
          margin: "auto",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <Typography variant="body2">{content}</Typography>
      </Box>
    );
  },

  renderBody() {
    return (
      <Box
        sx={{
          paddingTop: 13,
          paddingBottom: 10,
        }}
      >
        {this.renderBodyInner()}
      </Box>
    );
  },

  renderBodyInner() {
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
      </Box>
    );
  },

  renderInner() {
    const { nResultsDisplay, isPlaying, election } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <Box>
        {this.renderHeader()}
        {this.renderBody()}
        <PlayerControl
          key={nResultsDisplay}
          nResultsDisplay={nResultsDisplay}
          nResults={this.nResultsReleased}
          setNResultsDisplay={this.setNResultsDisplay.bind(this)}
          isPlaying={isPlaying}
          playAnimation={this.playAnimation.bind(this)}
          pauseAnimation={this.pauseAnimation.bind(this)}
        />
      </Box>
    );
  },

  render() {
    return <Box sx={{ textAlign: "center" }}>{this.renderInner()}</Box>;
  },
};

export default BasePageRenderMixin;

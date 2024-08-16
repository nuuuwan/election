import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import {
  ResultSingleView,
  HexagonMap,
  PredictionView,
  PDSelector,
} from "../../molecules";

const BasePageRenderColumnsMixin = {
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
        <Box
          sx={Object.assign({}, STYLE.BODY_HEADER, {
            color: this.resultLKDisplay.winningPartyColor,
          })}
        >
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
        <Box
          sx={Object.assign({}, STYLE.BODY_HEADER, {
            color: this.resultLKDisplay.winningPartyColor,
          })}
        >
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
};

export default BasePageRenderColumnsMixin;

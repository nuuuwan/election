import { Box } from "@mui/material";

import { useState } from "react";
import { STYLE } from "../../../nonview/constants";

import CustomSlider from "./CustomSlider";
import BottomNavigationCustom from "./BottomNavigationCustom";

const STYLE_PLAYER_CONTROL = {
  BOX: {
    position: "sticky",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2000,
    paddingTop: 1,
    backgroundColor: STYLE.COLOR.LIGHTEST,
  },
  BOTTOM_NAVIGATION: {
    backgroundColor: STYLE.COLOR.LIGHTEST,
  },
};

export default function PlayerControl({
  electionDisplay,
  election,
  setNResultsDisplay,
}) {
  const nResultsDisplay = electionDisplay.nResults;
  const nResults = election.nResults;

  const [nResultsDisplayUpdated, setNResultsDisplayUpdated] =
    useState(nResultsDisplay);
  const onChangeCommitted = function (__, value) {
    setNResultsDisplayUpdated(value);
    setNResultsDisplay(value);
  };
  const onChange = function (__, value) {
    setNResultsDisplayUpdated(value);
  };
  const onClickEndValue = function () {
    setNResultsDisplayUpdated(nResults);
    setNResultsDisplay(nResults);
  };

  return (
    <Box sx={STYLE_PLAYER_CONTROL.BOX}>
      <CustomSlider
        nResultsDisplayUpdated={nResultsDisplayUpdated}
        nResults={nResults}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
        onClickEndValue={onClickEndValue}
      />
      <BottomNavigationCustom
        nResultsDisplay={nResultsDisplay}
        nResults={nResults}
        setNResultsDisplay={setNResultsDisplay}
      />
    </Box>
  );
}

import { Box } from "@mui/material";

import { useState } from "react";


import CustomSlider from "./CustomSlider";
import BottomNavigationCustom from "./BottomNavigationCustom";



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
    <Box>
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

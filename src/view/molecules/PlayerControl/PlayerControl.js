import { Box } from "@mui/material";

import { useContext, useState } from "react";

import CustomSlider from "./CustomSlider";
import BottomNavigationCustom from "./BottomNavigationCustom";
import { DataContext } from "../../../nonview/core";

export default function PlayerControl({ electionDisplay, setNResultsDisplay }) {
  const nResultsDisplay = electionDisplay.nResults;
  const [nResultsDisplayUpdated, setNResultsDisplayUpdated] =
    useState(nResultsDisplay);

  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { election } = data;

  const nResults = election.nResults;

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

import { Box } from "@mui/material";
import { useState } from "react";

import CustomSlider from "./CustomSlider";
import BottomNavigationCustom from "./BottomNavigationCustom";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../../view/pages/BasePage/BasePageHandlerProvider";

export default function PlayerControl({ nResultsDisplay }) {
  const [nResultsDisplayUpdated, setNResultsDisplayUpdated] =
    useState(nResultsDisplay);
  const { setNResultsDisplay } = useBasePageHandlerContext();
  const data = useDataContext();
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

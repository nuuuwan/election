import {  Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";

import { CustomPagination } from "../atoms";

const N_DISPLAY = 3;

export default function LatestResultListView() {
  const data = useDataContext();


  if (!data) {
    return null;
  }
  const { election, nResultsDisplay } = data;
  const pdResultList = election.pdResultList;
  const n = pdResultList.length;
  const resultListDisplay = pdResultList
    .slice(Math.max(0, nResultsDisplay - N_DISPLAY), nResultsDisplay)
    .reverse();




  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">Results</Typography>

      <CustomPagination />

      {resultListDisplay.map(function (result) {
        return <CumResultsView key={result.entID} entID={result.entID} />;
      })}
    </Stack>
  );
}

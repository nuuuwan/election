import { Pagination, Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";
import { useBasePageHandlerContext } from "../pages/BasePage/BasePageHandlerProvider";

const N_DISPLAY = 3;

export default function LatestResultListView() {
  const data = useDataContext();
  const handlers = useBasePageHandlerContext();

  if (!data) {
    return null;
  }
  const { election, nResultsDisplay } = data;
  const pdResultList = election.pdResultList;
  const n = pdResultList.length;
  const resultListDisplay = pdResultList
    .slice(Math.max(0, nResultsDisplay - N_DISPLAY), nResultsDisplay)
    .reverse();

  const { setNResultsDisplay } = handlers;
  const onChange = function (event, value) {
    setNResultsDisplay(value);
  };

  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">Results</Typography>

      <Pagination
        key={nResultsDisplay}
        count={n}
        defaultPage={nResultsDisplay}
        siblingCount={1}
        boundaryCount={1}
        onChange={onChange}
      />

      {resultListDisplay.map(function (result) {
        return <CumResultsView key={result.entID} entID={result.entID} />;
      })}
    </Stack>
  );
}

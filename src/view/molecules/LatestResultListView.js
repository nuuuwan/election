import { Box, Typography,  } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";

const N_DISPLAY = 5;

export default function LatestResultListView() {
    const data = useDataContext();
    if (!data) {
      return null;
    }
    const { electionDisplay } = data;
   const pdResultList = electionDisplay.pdResultList;
   const n = pdResultList.length;
    const resultListDisplay = pdResultList.slice(n-N_DISPLAY, n).reverse();

    return (
      <Box>
        <Typography variant="h4">Latest Results</Typography>
        {resultListDisplay.map(function (result) {
          return (
            <CumResultsView key={result.entID} entID={result.entID} />
          );
        })}
      </Box>
    );
}
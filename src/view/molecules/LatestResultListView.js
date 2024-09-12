import { Box,  } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CumResultsView from "./CumResultsView";

const N_DISPLAY = 5;

export default function LatestResultListView() {
    const data = useDataContext();
    if (!data) {
      return null;
    }
    const { electionDisplay } = data;
   const resultList = electionDisplay.resultList;
   const n = resultList.length;
    const resultListDisplay = resultList.slice(n-N_DISPLAY, n).reverse();
    return (
      <Box>
        {resultListDisplay.map(function (result) {
          return (
            <CumResultsView key={result.entID} entID={result.entID} />
          );
        })}
      </Box>
    );
}
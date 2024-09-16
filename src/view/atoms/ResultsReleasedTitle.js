import { Alert, Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Format, Translate } from "../../nonview/base";

export default function ResultsReleasedTitle({ mode = "percent" }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const entID = "LK";
  const { nResultsTotal, nResultsReleased, pElectors } =
    electionDisplay.getReleaseStats(entID, pdIdx, electionPrevious);

  const isIncomplete = nResultsReleased < nResultsTotal;  

  let alert = null;
  if(isIncomplete){

    const warning = Translate("This is an Estimate, based on registered voter statistics, from previous elections.");
    alert = (
      <Alert severity="warning" sx={{ marginTop: 1, textAlign: "left" }}>
        <Typography variant="h6" >
          {warning}
        </Typography>
      </Alert>
    );
  }

  if (mode === "percent") {

    return (
      <Box sx={{marginBottom: 2}}>
        <Typography variant="h4" color="secondary" >
          {Format.percent(pElectors)} {Translate("Votes Counted")}
        </Typography>
        {alert}
      </Box>
    );
  }

  return (
    <Typography variant="h4" color="secondary" sx={{marginBottom: 2}}>
      {nResultsReleased}
      {"/"}
      {nResultsTotal} {Translate("Results Released")}
    </Typography>
  );
}

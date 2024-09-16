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
  let asterisk = "";
  let warning = "";
  if(isIncomplete){
    asterisk = "*";
    warning = asterisk + Translate("Estimate, based on registered voter statistics.");
  }

  if (mode === "percent") {

    return (
      <Box>
        <Typography variant="h4" color="secondary">
          {Format.percent(pElectors)} {Translate("Votes Counted")}{asterisk}
        </Typography>
        <Alert severity="warning" sx={{ m: 1 }}>
          {warning}
        </Alert>
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

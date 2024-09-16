import { Box, Typography } from "@mui/material";
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

  const isComplete = nResultsTotal ===  nResultsReleased

  if (mode === "percent") {
    const smallPrint = isComplete ? Translate("Final Result") : Translate("Estimate, based on registered voter statistics.")
    return (
      <Box>
        <Typography variant="h4" color="secondary">
          {Format.percent(pElectors)} {Translate("Votes Counted")}*
        </Typography>
        <Typography
          variant="body1"
          color="secondary"
          sx={{ m: 1, marginLeft: 10, marginRight: 10 }}
        >
          *{smallPrint}
        </Typography>
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

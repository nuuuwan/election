import { Alert, Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Format, Translate } from "../../nonview/base";

export function ResultsReleasedAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const entID = "LK";
  const { nResultsTotal, nResultsReleased,  } =
    electionDisplay.getReleaseStats(entID, pdIdx, electionPrevious);

  const isComplete = nResultsReleased < nResultsTotal;
  if (!isComplete) {
    return null;
  }


    const title = Translate("Votes Counted");
    const body = Translate(
      "This is an Estimate, based on registered voter statistics, from previous elections."
    );
    return (
      <Alert severity="info" sx={{ marginTop: 1, textAlign: "justify", maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6" sx={{fontWeight: "bold"}}>{title}</Typography>
      <Typography variant="body1">{body}</Typography>
    </Alert>
    )


} 

export default function ResultsReleasedTitle({ mode = "percent" }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const entID = "LK";
  const { nResultsTotal, nResultsReleased, pElectors } =
    electionDisplay.getReleaseStats(entID, pdIdx, electionPrevious);



  if (mode === "percent") {
    return (
      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="h4" color="secondary">
          {Format.percent(pElectors)} {Translate("Votes Counted")}
        </Typography>

      </Box>
    );
  }

  return (
    <Typography variant="h4" color="secondary" sx={{ marginBottom: 2 }}>
      {nResultsReleased}
      {"/"}
      {nResultsTotal} {Translate("Results Released")}
    </Typography>
  );
}

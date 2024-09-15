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

  if (mode === "percent") {
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
          {Translate("*Estimate, which may change with more results.")}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography variant="h4" color="secondary">
      {nResultsReleased}
      {"/"}
      {nResultsTotal} {Translate("Results Released")}
    </Typography>
  );
}

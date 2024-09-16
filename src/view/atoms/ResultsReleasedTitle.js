import {  Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Format, Translate } from "../../nonview/base";
import CustomAlert from "./CustomAlert";

export function ResultsReleasedAlert() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, electionPrevious } = data;

  const entID = "LK";
  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    entID,
    pdIdx,
    electionPrevious
  );

  const isComplete = nResultsReleased < nResultsTotal;
  if (!isComplete) {
    return null;
  }

  const title = Translate("Votes Counted");
  const body = Translate(
    "This is an Estimate, based on registered voter statistics, from previous elections."
  );
  return (
    <CustomAlert>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <Typography variant="body1">{body}</Typography>
    </CustomAlert>
  );
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
        <Typography variant="h3" color="gray">
          <span style={{ color: "black" }}>{Format.percent(pElectors)}</span>{" "}
          {Translate("Released")}
        </Typography>
      </Box>
    );
  }

  return (
    <Typography variant="h3" color="gray" sx={{ marginBottom: 2 }}>
      {Translate("Result")}{" "}
      <span style={{ color: "black" }}>{nResultsReleased}</span> {" of "}
      {nResultsTotal}
    </Typography>
  );
}

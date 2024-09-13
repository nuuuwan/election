import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { Translate } from "../../nonview/base";

export default function ResultsReleasedView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx } = data;

  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    entID,
    pdIdx
  );

  let title = "";
  let subTitle = "";
  if (nResultsTotal > 1) {
    title = `${nResultsReleased}/${nResultsTotal}`;
    subTitle = `${Translate(
      "Released"
    )}`;
  }

  if (nResultsReleased === nResultsTotal) {
    subTitle += ` (${Translate("Final")})`;
  }

  return (
    <Box >
      <Typography variant="body1" color={"secondary"}>
      {title}
    </Typography>
    <Typography variant="caption" color={"secondary"}>
      {subTitle}
    </Typography>
    </Box>
  );
}

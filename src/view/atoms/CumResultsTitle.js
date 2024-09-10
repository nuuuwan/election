import { Box, Typography } from "@mui/material";
import { Format, Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function CumResultsTitle() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, projectedElection } = data;

  const electorsReleased = electionDisplay.resultLK.summary.electors;
  const electorsProjected = projectedElection.resultLK.summary.electors;
  const pReleased = electorsReleased / electorsProjected;
  const subTitleProgress =
    Translate("Cumulative Total") +
    ` (${Format.percent(pReleased)} ` +
    Translate("released") +
    ")";

  return (

      <Box color={electionDisplay.color}>
        <Typography variant="body1">{subTitleProgress}</Typography>
        <Typography variant="h4">{Translate("Islandwide")}</Typography>
      </Box>

  );
}

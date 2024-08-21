import { Box, Typography } from "@mui/material";

import { ResultSingleView, CitationsView } from "..";
import { Format, Translate } from "../../../nonview/base";
import CustomStack from "./CustomStack";
export default function ColumnCumulativeResult({
  electionDisplay,
  db,
  projectedElection,
}) {
  const electorsReleased = electionDisplay.resultLK.summary.electors;
  const electorsProjected = projectedElection.resultLK.summary.electors;
  const pReleased = electorsReleased / electorsProjected;
  const subTitleProgress =
    Translate("Cumulative Total") +
    ` (${Format.percent(pReleased)} ` +
    Translate("released") +
    ")";

  return (
    <CustomStack>
      <Box color={electionDisplay.color}>
        <Typography variant="body1">{subTitleProgress}</Typography>
        <Typography variant="h4">{Translate("Islandwide")}</Typography>
      </Box>
      <ResultSingleView
        election={electionDisplay}
        elections={db.elections}
        entID={"LK"}
      />

      <CitationsView />
    </CustomStack>
  );
}

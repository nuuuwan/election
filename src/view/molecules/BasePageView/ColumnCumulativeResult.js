import { Box, Typography } from "@mui/material";

import { ResultSingleView } from "..";
import { Format, Translate } from "../../../nonview/base";
import CustomStack from "./CustomStack";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";
export default function ColumnCumulativeResult({
  electionDisplay,

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

  const db = useContext(DataContext);
  if (!db) {
    return null;
  }

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
    </CustomStack>
  );
}

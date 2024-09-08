import { Box, Typography } from "@mui/material";

import { HexagonMap } from "../../molecules";

import CustomStack from "./CustomStack";
import { Translate } from "../../../nonview/base";

export default function ColumnMap({
  election,
  electionDisplay,

  setActivePDID,
}) {
  const subTitleProgress =
    `${electionDisplay.nResults}/${election.nResults} ` + Translate("Results");

  return (
    <CustomStack>
      <Box color={electionDisplay.color}>
        <Typography variant="body1">{subTitleProgress}</Typography>
        <Typography variant="h4">{Translate("Maps")}</Typography>
      </Box>
      <HexagonMap election={electionDisplay} setActivePDID={setActivePDID} />
    </CustomStack>
  );
}

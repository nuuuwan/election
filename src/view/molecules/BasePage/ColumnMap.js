import { Box, Typography } from "@mui/material";

import HexMapView from "../../../view/molecules/HexMapView/HexMapView";

import CustomStack from "./CustomStack";
import { Translate } from "../../../nonview/base";
import { useDataContext } from "../../../nonview/core/DataProvider";

export default function ColumnMap() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, electionDisplay } = data;

  const subTitleProgress =
    `${electionDisplay.nResults}/${election.nResults} ` + Translate("Results");

  return (
    <CustomStack>
      <Box color={electionDisplay.color}>
        <Typography variant="body1">{subTitleProgress}</Typography>
        <Typography variant="h4">{Translate("Maps")}</Typography>
      </Box>
      <HexMapView />
    </CustomStack>
  );
}

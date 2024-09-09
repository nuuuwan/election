import { Box, Typography } from "@mui/material";

import { HexagonMap } from "../../molecules";

import CustomStack from "./CustomStack";
import { Translate } from "../../../nonview/base";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

export default function ColumnMap({ setActivePDID }) {
  const data = useContext(DataContext);
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
      <HexagonMap setActivePDID={setActivePDID} />
    </CustomStack>
  );
}

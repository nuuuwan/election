import { Typography } from "@mui/material";

import { HexagonMap } from "../../molecules";

import CustomStack from "./CustomStack";

export default function ColumnMap({
  election,
  electionDisplay,
  db,
  setActivePDID,
}) {
  const subTitleProgress = `${electionDisplay.nResults}/${election.nResults} Results`;

  return (
    <CustomStack>
      <Typography variant="body1">{subTitleProgress}</Typography>
      <Typography variant="h4">Maps</Typography>

      <HexagonMap
        election={electionDisplay}
        db={db}
        setActivePDID={setActivePDID}
      />
    </CustomStack>
  );
}

import { Stack, Typography } from "@mui/material";

import { Translate, Format } from "../../../nonview";

import { CustomAlert } from "../..";

import GenericScatterChart from "./GenericScatterChart";

export default function ElectorsView() {
  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography variant="h5">Registered Voters</Typography>
      <CustomAlert>
        {Translate(
          "An abnormal change in the number of registered voters across electionHistory could be suspicious."
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.electors}
        formatStat={Format.intHumanize}
      />
    </Stack>
  );
}

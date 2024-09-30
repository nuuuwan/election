import { Stack, Typography } from "@mui/material";

import {  Translate, Format } from "../../../nonview";

import { CustomAlert } from "../..";

import GenericScatterChart from "./GenericScatterChart";


export default function RejectedView() {
  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography variant="h5">Rejected Votes</Typography>
      <CustomAlert>
        {Translate(
          "A high percentage of spoiled or rejected ballots in certain areas could indicate attempts to suppress or manipulate results."
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.pRejected}
        formatStat={Format.percentFixed}
      />
    </Stack>
  );
}




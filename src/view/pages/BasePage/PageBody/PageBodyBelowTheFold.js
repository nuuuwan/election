import { Stack } from "@mui/material";

import {
  AggregatedResultView,
  MonitoringView,
  DisclaimerView,
  ModelDetailsView,
} from "../../../";

export default function PageBodyBelowTheFold() {
  return (
    <Stack
      direction="column"
      gap={3}
      sx={{
        marginTop: 15,
        p: 1,
        borderTop: "1px solid #eee",
      }}
    > 
      <ModelDetailsView />
      <AggregatedResultView />
      <MonitoringView />
      <DisclaimerView />
    </Stack>
  );
}

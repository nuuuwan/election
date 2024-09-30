import { Stack, Typography } from "@mui/material";

import { Translate } from "../../../nonview";

import BanfordView from "./BanfordView";
import TurnoutView from "./TurnoutView";
import RejectedView from "./RejectedView";
import ElectorsView from "./ElectorsView";

export default function MonitoringView() {
  return (
    <Stack direction="column" gap={3}>
      <Typography variant="h4">{Translate("Monitoring")}</Typography>
      <BanfordView />
      <TurnoutView />
      <RejectedView />
      <ElectorsView />
    </Stack>
  );
}

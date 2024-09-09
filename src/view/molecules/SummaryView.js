import { Stack } from "@mui/material";
import { Format } from "../../nonview/base";
import LabelledStat from "../atoms/LabelledStat";

export default function SummaryView({ summary }) {
  return (
    <Stack direction="row" gap={2} sx={{ margin: "auto" }}>
      <LabelledStat
        label="Reg. Voters"
        valueStr={Format.intHumanize(summary.electors)}
      />
      <LabelledStat
        label="Turnout"
        valueStr={Format.percent(summary.pTurnout)}
      />
      <LabelledStat
        label="Rejected"
        valueStr={Format.percent(summary.pRejected)}
      />
    </Stack>
  );
}

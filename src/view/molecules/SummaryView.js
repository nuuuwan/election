import { Box } from "@mui/material";
import { Format } from "../../nonview/base";
import LabelledStat from "../atoms/LabelledStat";

export default function SummaryView({ summary }) {
  console.debug({ summary });
  return (
    <Box>
      <LabelledStat
        label="Electors"
        valueStr={Format.intHumanize(summary.electors)}
      />{" "}
      <LabelledStat
        label="Turnout"
        valueStr={Format.percent(summary.pTurnout, 1)}
      />{" "}
      <LabelledStat
        label="Rejected"
        valueStr={Format.percent(summary.pRejected, 1)}
      />
    </Box>
  );
}

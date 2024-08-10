import { Box } from "@mui/material";
import { Format } from "../../nonview/base";
import LabelledStat from "../atoms/LabelledStat";

export default function SummaryView({ summary }) {
  return (
    <Box>
      <LabelledStat
        label="Electors"
        valueStr={Format.intHumanize(summary.electors)}
      />{" "}
      <LabelledStat
        label="Turnout"
        valueStr={Format.percentWithStyle(summary.pTurnout)}
      />{" "}
      <LabelledStat
        label="Rejected"
        valueStr={Format.percentWithStyle(summary.pRejected)}
      />
    </Box>
  );
}

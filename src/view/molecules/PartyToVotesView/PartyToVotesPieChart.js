import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Party } from "../../../nonview/core";
import { Format } from "../../../nonview/base";

import { STYLE } from "../../../nonview/constants";
import { Box } from "@mui/material";

const CHART_SIZE = 180;

export default function PartyToVotesPieChart({ partyToVotes }) {
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);
  const data = entries.map(function ([partyID, votes]) {
    const party = Party.fromID(partyID);
    return {
      id: partyID,
      value: votes / partyToVotes.totalVotes,
      label: partyID,
      color: party.color || STYLE.COLOR.LIGHT,
    };
  });

  return (
    <Box sx={{ display: "flex", p: 0.5 }}>
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => Format.percentVotes(item.value),
            arcLabelMinAngle: 30,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontSize: "100%",
            fontFamily: STYLE.FONT_FAMILY,
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        width={CHART_SIZE}
        height={CHART_SIZE}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
    </Box>
  );
}

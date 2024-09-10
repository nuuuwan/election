import { Party } from "../../../nonview/core";
import { Format } from "../../../nonview/base";

import { Box } from "@mui/material";
import { THEME_DATA } from "../../_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";

export default function PartyToVotesBarChart({
  title,
  partyToVotes,
  chartSize,
}) {
  chartSize = chartSize || 480;
  const totalVotes = partyToVotes.totalVotes;
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);
  const series = entries.reverse().map(function ([partyID, votes]) {
    const party = Party.fromID(partyID);
    return {
      data: [votes / totalVotes],
      label: partyID,
      stack: "PD",
      color: party.color,
    };
  });

  const xAxisLabels = [title];

  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <BarChart
        xAxis={[{ scaleType: "band", data: xAxisLabels }]}
        series={series}
        barLabel={function (item, context) {
          const pVotes = item.value;
          if (pVotes < 0.2) {
            return "";
          }
          return Format.percentVotes(pVotes);
        }}
        width={chartSize}
        height={chartSize}
        sx={{
          [`& .${barLabelClasses.root}`]: {
            fill: "white",
            fontSize: chartSize / 9,
            fontFamily: THEME_DATA.typography.fontFamily,
          },
        }}
        leftAxis={null}
        slotProps={{ legend: { hidden: true } }}
      />
    </Box>
  );
}

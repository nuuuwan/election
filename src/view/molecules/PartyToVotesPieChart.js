import { PieChart, pieArcLabelClasses } from "@mui/x-charts/PieChart";
import { Party } from "../../nonview/core";
import { Format } from "../../nonview/base";
import { Box } from "@mui/material";

export default function PartyToVotesPieChart({ partyToVotes }) {
  const data = Object.entries(partyToVotes.partyToVotesSortedOthered).map(
    function ([partyID, votes]) {
      const party = Party.fromID(partyID);
      return {
        id: partyID,
        value: votes / partyToVotes.totalVotes,
        label: partyID,
        color: party.color || "#888",
      };
    }
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <PieChart
        series={[
          {
            data,
            arcLabel: (item) => Format.percent(item.value),
            arcLabelMinAngle: 60,
            paddingAngle: 1,
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: "white",
            fontWeight: "bold",
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        width={300}
        height={300}
      />
    </Box>
  );
}

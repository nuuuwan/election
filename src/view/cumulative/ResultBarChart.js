import { Party, PartyToVotes } from "../../nonview";
import { Format } from "../../nonview";

import { Box } from "@mui/material";
import { THEME_DATA } from "../_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";

function getAxis() {
  return [
    {
      scaleType: "band",
      data: [""],
      categoryGapRatio: 0,
      barGapRatio: 0,
    },
  ];
}

function getBarLabel() {
  return function (item, context) {
    const pVotes = item.value;
    if (pVotes < PartyToVotes.MIN_P_VOTES) {
      return "";
    }
    return Format.percentVotes(pVotes);
  };
}

function getStyle(smallestP) {
  return {
    [`& .${barLabelClasses.root}`]: {
      fill: "white",
      fontSize: THEME_DATA.typography.fontSize * 1.4,
      fontFamily: THEME_DATA.typography.fontFamily,
    },
  };
}

export default function ResultBarChart({ resultsElection, entID }) {
  const result = resultsElection.resultIdx[entID];
  const partyToVotes = result.partyToVotes;
  const totalVotes = partyToVotes.totalVotes;

  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  const series = entries.map(function ([partyID, votes]) {
    const party = Party.fromID(partyID);
    const pVotes = (votes- 0.5) / totalVotes;

    return {
      data: [pVotes],
      label: partyID,
      stack: "",
      color: party.color,
    };
  });

  return (
    <Box sx={{ p: 0, m: 0 }}>
      <BarChart
        yAxis={getAxis()}
        series={series}
        barLabel={getBarLabel()}
        layout="horizontal"
        bottomAxis={null}
        width={220}
        height={50}
        sx={getStyle()}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
    </Box>
  );
}

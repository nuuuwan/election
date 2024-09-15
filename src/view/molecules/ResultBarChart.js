import { Party } from "../../nonview/core";
import { Format } from "../../nonview/base";

import { Box } from "@mui/material";
import { THEME_DATA } from "../_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";

function getAxis() {
  return [
    {
      scaleType: "band",
      data: [""],
      tickPlacement: "middle",
      tickLabelPlacement: "middle",
      tickLabelStyle: {
        wordWrap: "break-word",
        fontSize: THEME_DATA.typography.fontSize * 0.7,
        fontFamily: THEME_DATA.typography.fontFamily,
      },
      categoryGapRatio: 0,
      barGapRatio: 0,
    },
  ];
}

function getBarLabel() {
  return function (item, context) {
    const pVotes = item.value;
    if (pVotes < 0.2) {
      return "";
    }
    return Format.percentVotes(pVotes);
  };
}

function getStyle() {
  return {
    [`& .${barLabelClasses.root}`]: {
      fill: "white",
      fontSize: THEME_DATA.typography.fontSize * 2,
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
    const pVotes = votes / totalVotes;

    return {
      data: [pVotes],
      label: partyID,
      stack: "Common",
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
        width={200}
        height={50}
        sx={getStyle()}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
    </Box>
  );
}

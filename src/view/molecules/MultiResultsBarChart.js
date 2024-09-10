import { Party } from "../../nonview/core";
import { Format,  } from "../../nonview/base";

import { Box } from "@mui/material";
import { THEME_DATA } from "../../view/_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function MultiResultsBarChart({ resultsElection, entIDs }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }


  const result = resultsElection.resultIdx[entIDs[0]];
  const partyToVotes = result.partyToVotes;
  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);
  const series = entries.map(function ([partyID, votes]) {
    const party = Party.fromID(partyID);
    return {
      data: entIDs.map(function (entID) {
        const result = resultsElection.resultIdx[entID];
        const partyToVotes = result.partyToVotes;
        const totalVotes = partyToVotes.totalVotes;
        const votes = partyToVotes.partyToVotes[partyID] || 0;
        const pVotes = votes / totalVotes;
        return pVotes;
      }),
      label: partyID,
      stack: "Common",
      color: party.color,
    };
  });

  const axisLabels = [""];
  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <BarChart
        yAxis={[
          {
            scaleType: "band",
            data: axisLabels,
            tickPlacement: "middle",
            tickLabelPlacement: "middle",
            tickLabelStyle: {
              wordWrap: "break-word",
              fontSize: THEME_DATA.typography.fontSize * 0.7,
              fontFamily: THEME_DATA.typography.fontFamily,
            },
          },
        ]}
        series={series}
        barLabel={function (item, context) {
          const pVotes = item.value;
          if (pVotes < 0.2) {
            return "";
          }
          return Format.percentVotes(pVotes);
        }}
        layout="horizontal"
        bottomAxis={null}
        width={240}
        height={80}
        sx={{
          [`& .${barLabelClasses.root}`]: {
            fill: "white",
            fontSize: THEME_DATA.typography.fontSize * 2,
            fontFamily: THEME_DATA.typography.fontFamily,
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
    </Box>
  );
}

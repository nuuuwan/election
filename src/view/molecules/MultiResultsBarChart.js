import { Party } from "../../nonview/core";
import { Format, StringX, Translate } from "../../nonview/base";

import { Box } from "@mui/material";
import { THEME_DATA } from "../../view/_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function MultiResultsBarChart({ resultsElection, entIDs }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { allRegionIdx } = data;

  const result = resultsElection.resultIdx["LK"];
  const partyToVotes = result.partyToVotes;
  const entries = Object.entries(partyToVotes.partyToVotes);
  const series = entries.reverse().map(function ([partyID, votes]) {
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

  const axisLabels = entIDs.map(function (entID, i) {
    const entTypeLabel = ["PD", "ED", "Pr.", ""][i];
    const translatedName = Translate(allRegionIdx[entID].name);
    let label = translatedName;
    if (label.length > 12) {
      label = StringX.getShortLabel(label);
    }

    return label + " " + Translate(entTypeLabel);
  });

  const chartSize = 320;
  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <BarChart
        xAxis={[
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
        layout="vertical"
        leftAxis={null}
        width={chartSize}
        height={chartSize}
        sx={{
          [`& .${barLabelClasses.root}`]: {
            fill: "white",
            fontSize: chartSize / 15,
            fontFamily: THEME_DATA.typography.fontFamily,
          },
        }}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 30, left: 0 }}
      />
    </Box>
  );
}

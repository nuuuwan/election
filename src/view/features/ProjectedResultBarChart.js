import { BarChart, barLabelClasses } from "@mui/x-charts";

import { Box } from "@mui/material";

import { Party, PartyToVotes } from "../../nonview";
import { Format } from "../../nonview";

import { THEME_DATA } from "../_constants/THEME";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";

function getAxis() {
  return [
    {
      scaleType: "band",
      data: [""],

      tickPlacement: "middle",
      tickLabelPlacement: "middle",
      tickLabelStyle: {
        wordWrap: "break-word",
        fontSize: THEME_DATA.typography.fontSize,
        fontFamily: THEME_DATA.typography.fontFamily,
      },
      categoryGapRatio: 0.1,
      barGapRatio: 0.1,
    },
  ];
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
function getBarLabel(electionProjected) {
  const result = electionProjected.resultLK;
  const partyToVotes = result.partyToVotes;
  const totalVotes = partyToVotes.totalVotes;
  const uncertainVotes = partyToVotes.partyToVotes[Party.ERROR.id];
  const pVotesExtra = uncertainVotes / totalVotes;

  return function (item, __) {
    const pVotes = item.value;

    if (pVotes === pVotesExtra) {
      return "";
    }

    if (pVotes + pVotesExtra < PartyToVotes.MIN_P_VOTES) {
      return "";
    }

    const hasWon = pVotes > 0.5;
    const text = Format.percentVotesRange(pVotes, pVotes + pVotesExtra);

    return text + (hasWon ? " ✓" : "");
  };
}

function getSeries(electionProjected) {
  const result = electionProjected.resultLK;
  const partyToVotes = result.partyToVotes;
  const totalVotes = partyToVotes.totalVotes;
  const uncertainVotes = partyToVotes.partyToVotes[Party.ERROR.id];
  const pVotesExtra = uncertainVotes / totalVotes;

  const entries = Object.entries(partyToVotes.partyToVotesSortedOthered);

  return entries.reduce(function (series, [partyID, votes]) {
    const party = Party.fromID(partyID);
    if (party.isNonParty) {
      return series;
    }

    const pVotes = votes / totalVotes;

    series.push({
      data: [pVotes],
      label: partyID,
      color: party.color,
      stack: partyID,
    });

    if (pVotesExtra) {
      series.push({
        data: [pVotesExtra],
        label: partyID + "-Max",
        color: party.color,
        stack: partyID,
      });
    }

    return series;
  }, []);
}

export default function ProjectedResultBarChart() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected } = data;

  return (
    <Box sx={{ p: 0, m: 0 }}>
      <BarChart
        xAxis={[
          {
            label: "% Votes",
            valueFormatter: (value) => Format.percentVotes(value),
          },
        ]}
        yAxis={getAxis()}
        series={getSeries(electionProjected)}
        barLabel={getBarLabel(electionProjected)}
        layout="horizontal"
        width={320}
        height={240}
        sx={getStyle()}
        grid={{ vertical: true }}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 10, bottom: 60, left: 0 }}
      />
    </Box>
  );
}

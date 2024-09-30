import { Party, Seats } from "../../nonview";

import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { Stack } from "@mui/material";
import { THEME_DATA } from "../_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";
import { useDataContext } from "../../nonview/core/DataProvider";

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
    return item.value;
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

export default function SeatsBarChart({ resultsElection, entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }

  const { electionProjected } = data;

  const seats = Seats.fromElection(electionProjected);

  const partyToSeats = seats.regionToPartyToSeats[entID];
  if (!partyToSeats) {
    return null;
  }

  const entries = Object.entries(partyToSeats);

  const series = entries.map(function ([partyID, seats]) {
    const party = Party.fromID(partyID);

    return {
      data: [seats],
      label: partyID,
      stack: "",
      color: party.color,
    };
  });

  return (
    <Stack direction="row" gap={1} sx={{ p: 0, m: 0, alignItems: "center" }}>
      <OnlinePredictionIcon sx={{ color: "lightgray" }} />
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
    </Stack>
  );
}

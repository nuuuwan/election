import { Color, MathX, Party, Seats } from "../../nonview";

import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import { Stack, Typography } from "@mui/material";
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

function getBarLabel(totalSeats) {
  return function (item, context) {
    const seats = item.value;
    if (seats < (2 * totalSeats * Seats.MIN_SEATS_FOR_DISPLAY) / 182) {
      return "";
    }
    return seats;
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

  const partyToSeats = seats.getPartyToSeats(entID);
  if (!partyToSeats) {
    return null;
  }

  const entries = Object.entries(partyToSeats);

  const totalSeats = MathX.sum(Object.values(partyToSeats));

  const series = entries.map(function ([partyID, seats]) {
    const party = Party.fromID(partyID);

    return {
      data: [seats],
      label: partyID,
      stack: "",
      color: Color.getColorWithAlpha(party.color, 0.5),
    };
  });

  return (
    <Stack direction="row" gap={0.1} sx={{ p: 0, m: 0, alignItems: "center" }}>
      <OnlinePredictionIcon sx={{ color: "lightgray" }} />
      <BarChart
        yAxis={getAxis()}
        series={series}
        barLabel={getBarLabel(totalSeats)}
        layout="horizontal"
        bottomAxis={null}
        width={180}
        height={50}
        sx={getStyle()}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      />
      <Typography variant="body2" sx={{ color: "gray" }}>
        /{totalSeats}
      </Typography>
    </Stack>
  );
}

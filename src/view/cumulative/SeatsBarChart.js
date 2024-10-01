import { Color, MathX, Party, Seats, Translate } from "../../nonview";


import { Stack, Typography } from "@mui/material";
import { THEME_DATA } from "../_constants/THEME";
import { BarChart, barLabelClasses } from "@mui/x-charts";

import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";

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

function getBarLabel(partyToSeats, totalSeats) {
  return function (item, context) {
    const partyID = item.seriesId;
    const seats = partyToSeats[partyID];
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
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }

  const { electionProjected, entIdx , electionDisplay} = data;
  if (!electionProjected) {
    return null;
  }

  const seats = Seats.fromElection(electionProjected);

  const partyToSeats = seats.getPartyToSeats(entID);
  if (!partyToSeats) {
    return null;
  }

  const entries = Object.entries(partyToSeats);
  const totalSeats = MathX.sum(Object.values(partyToSeats));

  const isComplete = electionDisplay.isComplete(
    entID,
    entIdx
  );
  


  const series = entries.map(function ([partyID, seats]) {
    const party = Party.fromID(partyID);
    return {
      id: partyID,
      data: [(seats - 0.000001) / totalSeats], // HACK!
      label: partyID,
      stack: "Common",
      color: party.color,
    };
  });

  const label = isComplete ? "Final" : "Projected";



  return (
    <Stack direction="column" gap={1}>
      <Typography variant="body1" sx={{ color: "gray" }}>
        {Translate(label + " Seats")} ({totalSeats})
        </Typography> 
    <Stack direction="row" gap={1} sx={{ p: 0, m: 0, alignItems: "center" }}>

      <BarChart
        yAxis={getAxis()}
        series={series}
        barLabel={getBarLabel(partyToSeats, totalSeats)}
        layout="horizontal"
        bottomAxis={null}
        width={220}
        height={50}
        sx={getStyle()}
        slotProps={{ legend: { hidden: true } }}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}

      />

    </Stack> </Stack>
  );
}

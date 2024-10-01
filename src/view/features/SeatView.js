
import { Color, Party, Seats } from "../../nonview";
import { BarChart, barLabelClasses } from "@mui/x-charts";

import { THEME_DATA } from "../_constants/THEME";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

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

function getBarLabel(seats) {
  const partyToUFG = seats.partyToUFG;
  return function (item) {
    const { seriesId, value } = item;
    if (seriesId.includes("ufg")) {
      return "";
    }
    const ufg = partyToUFG[seriesId] || 0;

    if (value < Seats.MIN_SEATS_FOR_DISPLAY * 4) {
      return "";
    }

    if (ufg > 0) {
      return `${value} - ${value + ufg}`;
    }
    return value;
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

function getSeries(seats) {
  const seriesSeats = Object.entries(seats.partyToSeatsMain).map(function ([
    partyID,
    seats,
  ]) {
    const party = Party.fromID(partyID);

    return {
      id: partyID,
      data: [seats],
      label: partyID,
      stack: partyID,
      color: Color.getColorWithAlpha(party.color, 0.5),
    };
  });

  const partyToUFG = seats.partyToUFG;
  const seriesUFG = Object.keys(seats.partyToSeatsMain).map(function (partyID) {
    const party = Party.fromID(partyID);
    const ufg = partyToUFG[partyID] || 0;

    const id = `${partyID}-ufg`;
    return {
      id,
      data: [ufg],
      label: id,
      stack: partyID,
      color: Color.getColorWithAlpha(party.color, 0.25),
    };
  });

  return [].concat(seriesSeats, seriesUFG);
}

function SeatsBarChart() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected } = data;
  const seats = Seats.fromElection(electionProjected);

  return (
    <BarChart
      series={getSeries(seats)}
      xAxis={[
        {
          label: "Seats",
        },
      ]}
      yAxis={getAxis()}
      sx={getStyle()}
      barLabel={getBarLabel(seats)}
      layout="horizontal"
      width={320}
      height={240}
      grid={{ vertical: true }}
      slotProps={{ legend: { hidden: true } }}
      margin={{ top: 0, right: 10, bottom: 60, left: 0 }}
    />
  );
}

export default function SeatView() {
  return <SeatsBarChart />;
}

import React from "react";
import { THEME_DATA } from "../_constants/THEME";
import SVGHexMap from "./HexMapView/SVGHexMap";
import HexMapData from "./HexMapView/HexMapData/HexMapData";
import HEXMAP_DATA_ED from "./HexMapView/HexMapData/HEXMAP_DATA_ED_UNITS";

import { Party, Seats, StringX } from "../../nonview";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";

const R_CIRCLE = 0.33;
const ALPHA0 = -Math.PI / 2;

function SVGSeatCircleText({ x, y, partyID, seats }) {
  let colorText = "white";

  if (partyID === Party.ERROR.id) {
    colorText = "gray";
  }

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="middle"
      fill={colorText}
      fontSize={R_CIRCLE * 0.8}
    >
      {seats}
    </text>
  );
}

function SVGSeatCircleCircle({ cx, cy, partyID }) {
  let color = Party.fromID(partyID).color;
  let stroke = "#fff";
  let strokeDasharray = null;

  if (partyID === Party.ERROR.id) {
    color = "white";
    stroke = "lightgray";
    strokeDasharray = R_CIRCLE / 10;
  }

  return (
    <circle
      cx={cx}
      cy={cy}
      r={R_CIRCLE * 0.6}
      fill={color}
      stroke={stroke}
      strokeDasharray={strokeDasharray}
      strokeWidth={R_CIRCLE / 10}
    />
  );
}

function SVGSeatCircle({ i, n, x, y, partyID, seats }) {
  const alpha = ALPHA0 + ((n - i - 1) * 2 * Math.PI) / n;
  const cx = x + R_CIRCLE * Math.cos(alpha);
  const cy = y + R_CIRCLE * Math.sin(alpha);

  return (
    <g>
      <SVGSeatCircleCircle cx={cx} cy={cy} partyID={partyID} />
      <SVGSeatCircleText x={cx} y={cy} partyID={partyID} seats={seats} />
    </g>
  );
}

function SVGSeatCircles({ x, y, partyToSeats, label }) {
  label = StringX.getShortLabel(label);
  const n = Object.keys(partyToSeats).length;

  return (
    <g>
      {Object.entries(partyToSeats)
        .reverse()
        .map(function ([partyID, seats], i) {
          return (
            <SVGSeatCircle
              key={i}
              i={i}
              n={n}
              x={x}
              y={y}
              partyID={partyID}
              seats={seats}
            />
          );
        })}
    </g>
  );
}

function getCustomOverlayRenderer(seats, edIdx) {
  return function ({ x, y, entID }) {
    const partyToSeats = seats.getPartyToSeats(entID);
    return (
      <SVGSeatCircles
        x={x}
        y={y}
        partyToSeats={partyToSeats}
        label={edIdx[entID].name}
      />
    );
  };
}

export default function SeatsHexMap() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected, edIdx } = data;
  if (!electionProjected) {
    return null;
  }

  const mapData = HexMapData.offsetData(HEXMAP_DATA_ED, "", [2, 0]);
  const seats = Seats.fromElection(electionProjected);
  const customOverlayRenderer = getCustomOverlayRenderer(seats, edIdx);

  return (
    <svg
      viewBox={"-1.5 -0.75 9.5 8.5"}
      fontFamily={THEME_DATA.typography.fontFamily}
    >
      <SVGHexMap
        mapData={mapData}
        customOverlayRenderer={customOverlayRenderer}
      />
      <SVGSeatCircles
        x={5}
        y={0}
        partyToSeats={seats.lkPartyToSeats}
        label={"National List"}
      />
      <text x={5} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={0.125} fill="#ccc">
        NL
      </text>
    </svg>
  );
}

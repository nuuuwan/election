import { EntType } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { THEME_DATA } from "../../_constants/THEME";

import SVGHexPolygon from "./SVGHexPolygon";
import SVGHexText from "./SVGHexText";

function getXY(baseEntType) {
  switch (baseEntType) {
    case EntType.PD:
      return { x: 8, y: 3 };
    case EntType.ED:
      return { x: 5, y: 0 };
    default:
      throw new Error("Unknown baseEntType: " + baseEntType);
  }
} 

export default function SVGLegendParty({baseEntType }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const {x, y} = getXY(baseEntType);
  return Object.keys(electionDisplay.getPartyToWins()).map(function (
    partyID,
    i
  ) {
    const color = Party.fromID(partyID).color;
    const [x1, y1] = [
      x + parseInt(i / THEME_DATA.HEXMAP.N_COLS),
      y +
        ((i % THEME_DATA.HEXMAP.N_COLS) +
          (parseInt(i / THEME_DATA.HEXMAP.N_COLS) % 2 === 1 ? 0.5 : 0)) /
          Math.cos(Math.PI / 6),
    ];

    return (
      <g key={partyID}>
        <SVGHexPolygon x={x1} y={y1} color={color} label={partyID} />
        <SVGHexText x={x1} y={y1} color={"white"} label={partyID} opacity={1} />
      </g>
    );
  });
}

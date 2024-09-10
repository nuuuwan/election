import { Party } from "../../../nonview/core";
import { useDataContext } from "../../../nonview/core/DataProvider";

import SVGHexPolygon from "./SVGHexPolygon";
import StyleHexMap from "./StyleHexMap";
import SVGHexText from "./SVGHexText";

export default function SVGLegendParty({ x, y }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election } = data;
  return Object.keys(election.getPartyToWins()).map(function (partyID, i) {
    const color = Party.fromID(partyID).color;
    const [x1, y1] = [
      x + parseInt(i / StyleHexMap.N_COLS),
      y +
        ((i % StyleHexMap.N_COLS) +
          (parseInt(i / StyleHexMap.N_COLS) % 2 === 1 ? 0.5 : 0)) /
          Math.cos(Math.PI / 6),
    ];

    return (
      <g key={partyID}>
        <SVGHexPolygon
          x={x1}
          y={y1}
          color={color}
          label={partyID}
          opacity={1}
        />
        <SVGHexText x={x1} y={y1} color={color} label={partyID} opacity={1} />
      </g>
    );
  });
}

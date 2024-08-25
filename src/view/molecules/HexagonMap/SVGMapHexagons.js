import { Color } from "../../../nonview/base";
import { STYLE } from "../../../nonview/constants";
import { Party } from "../../../nonview/core";

import SVGHexagon from "./SVGHexagon";

export default function SVGMapHexagons({
  mapData,
  resultIdx,
  db,
  setActivePDID,
}) {
  const { idx } = mapData;

  return Object.entries(idx).map(function ([entID, points]) {
    

    const nPoints = points.length;
    const iLabel = Math.floor(nPoints / 2);

    return points.map(function ([x, y], iPoint) {
      const result = resultIdx[entID];
      const ent = db.pdIdx[entID] || db.edIdx[entID] || db.provinceIdx[entID];
      const label = ent.name;
      let color = STYLE.COLOR.LIGHTEST;
      let opacity = 1;
  
      if (result) {
        const winningPartyID = result.partyToVotes.winningPartyID;
        color = Party.fromID(winningPartyID).color;
        opacity = Color.getOpacity(result.partyToVotes.pWinner);
      }
  
      const onClick = function () {
        if (entID.length === 6) {
          setActivePDID(entID);
        }
      };
  
      return (
        <SVGHexagon
          key={entID+'-'+iPoint}
          x={x}
          y={y / Math.cos(Math.PI / 6)}
          color={color}
          opacity={opacity}
          label={(iLabel === iPoint) ? label : ""}
          onClick={onClick}
        />
      );
    });
  });

  
}

import { useContext } from "react";
import { Color } from "../../../nonview/base";
import { STYLE } from "../../../nonview/constants";
import { DataContext, Party } from "../../../nonview/core";

import SVGHexagon from "./SVGHexagon";
import SVGHexagonLabel from "./SVGHexagonLabel";

export default function SVGMapHexagons({
  mapData,

  setActivePDID,
}) {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { election, pdIdx, edIdx, provinceIdx } = data;
  const resultIdx = election.resultIdx;

  const { idx } = mapData;

  const renderedItems = Object.entries(idx).map(function ([entID, points]) {
    const nPoints = points.length;

    const result = resultIdx[entID];

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

    const renderedHexagons = points.map(function ([x, y], iPoint) {
      return (
        <SVGHexagon
          key={iPoint}
          x={x}
          y={y / Math.cos(Math.PI / 6)}
          color={color}
          opacity={opacity}
          onClick={onClick}
        />
      );
    });

    let [x, y] = points
      .reduce(
        function ([x, y], [x2, y2]) {
          return [x + x2, y + y2];
        },
        [0, 0]
      )
      .map(function (z) {
        return z / nPoints;
      });

    const ent = pdIdx[entID] || edIdx[entID] || provinceIdx[entID];
    const label = ent.name;

    const renderedLabel = (
      <SVGHexagonLabel
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={color}
        opacity={opacity}
        label={label}
        onClick={onClick}
      />
    );
    return { renderedHexagons, renderedLabel };
  });

  return (
    <g>
      {renderedItems.map(function ({ renderedHexagons }, i) {
        return <g key={"hex" + i}>{renderedHexagons}</g>;
      })}
      {renderedItems.map(function ({ renderedLabel }, i) {
        return <g key={"label" + i}>{renderedLabel}</g>;
      })}
    </g>
  );
}

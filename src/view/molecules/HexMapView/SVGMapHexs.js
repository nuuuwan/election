import { Color, EntType } from "../../../nonview/base";

import { Party } from "../../../nonview/core";

import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../BasePage/BasePageHandlerProvider";

import SVGHexPolygon from "./SVGHexPolygon";
import SVGHexText from "./SVGHexText";

export default function SVGMapHexs({ mapData }) {
  const { setActivePDID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, electionDisplay, pdIdx, edIdx, provinceIdx } = data;
  const resultIdx = electionDisplay.resultIdx;
  const resultList = election.resultList;

  const { idx } = mapData;

  const renderedItems = Object.entries(idx).map(function ([entID, points]) {
    const nPoints = points.length;

    const result = resultIdx[entID];

    let color = "ghostwhite";
    let opacity = 1;

    if (result) {
      const winningPartyID = result.partyToVotes.winningPartyID;
      color = Party.fromID(winningPartyID).color;
      opacity = Color.getOpacity(result.partyToVotes.pWinner);
    }
    const onClick = function () {
      const entType = EntType.fromID(entID);
      if (entType === EntType.PD) {
        setActivePDID(entID);
      } else if (entType === EntType.ED) {
        for (let result of resultList.reverse()) {
          const pdEnt = pdIdx[result.entID];
          if (pdEnt && pdEnt.d.ed_id === entID) {
            setActivePDID(result.entID);
            break;
          }
        }
      } else if (entType === EntType.PROVINCE) {
        for (let result of resultList.reverse()) {
          const pdEnt = pdIdx[result.entID];
          if (pdEnt && pdEnt.d.province_id === entID) {
            setActivePDID(result.entID);
            break;
          }
        }
      }
    };

    const renderedHexs = points.map(function ([x, y], iPoint) {
      return (
        <SVGHexPolygon
          key={iPoint}
          x={x}
          y={y / Math.cos(Math.PI / 6)}
          color={color}
          opacity={opacity}
          onClick={onClick}
        />
      );
    });

    const [x, y] = points[Math.floor(nPoints / 2)];

    const ent = pdIdx[entID] || edIdx[entID] || provinceIdx[entID];
    const label = ent.name;

    const renderedLabel = (
      <SVGHexText
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={color}
        opacity={opacity}
        label={label}
        onClick={onClick}
      />
    );
    return { renderedHexs, renderedLabel };
  });

  return (
    <g>
      {renderedItems.map(function ({ renderedHexs }, i) {
        return <g key={"hex" + i}>{renderedHexs}</g>;
      })}
      {renderedItems.map(function ({ renderedLabel }, i) {
        return <g key={"label" + i}>{renderedLabel}</g>;
      })}
    </g>
  );
}

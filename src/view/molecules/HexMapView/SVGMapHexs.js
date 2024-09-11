import { Color } from "../../../nonview/base";
import {  ActivePDUtils } from "../../../nonview/core";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../BasePage/BasePageHandlerProvider";
import SVGHexPolygonGroup from "./SVGHexPolygonGroup";
import SVGHexText from "./SVGHexText";

function getOnClick({ entID, setActivePDID, pdIdx, resultList }) {
  return function () {
    const newActivePDID = ActivePDUtils.getNewActivePDID({
      resultList,
      pdIdx,
      entID,
    });
    if (newActivePDID) {
      setActivePDID(newActivePDID);
    }
  };
}

function getRenderedItem({ entID, points, data, setActivePDID }) {
  const { election, electionDisplay, pdIdx, allRegionIdx } = data;
  const result = electionDisplay.resultIdx[entID];

  let color = "ghostwhite";
  let opacity = 1;
  if (electionDisplay.isComplete(entID, pdIdx) && result) {
    color = result.color;
    opacity = Color.getOpacity(result.pWinner);
  }

  const onClick = getOnClick({
    entID,
    setActivePDID,
    pdIdx,
    resultList: election.resultList,
  });

  const [x, y] = points[Math.floor(points.length / 2)];
  return {
    renderedHexs: (
      <SVGHexPolygonGroup
        points={points}
        color={color}
        opacity={opacity}
        onClick={onClick}
      />
    ),
    renderedLabel: (
      <SVGHexText
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={Color.getTextColor(color, opacity)}
        label={allRegionIdx[entID].name}
        onClick={onClick}
      />
    ),
  };
}

function getRenderedItems({ mapData, data, setActivePDID }) {
  const { idx } = mapData;

  return Object.entries(idx).map(function ([entID, points]) {
    return getRenderedItem({
      entID,
      points,

      data,
      setActivePDID,
    });
  });
}

export default function SVGMapHexs({ mapData }) {
  const { setActivePDID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const renderedItems = getRenderedItems({ mapData, data, setActivePDID });

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

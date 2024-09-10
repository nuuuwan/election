import { Color,  } from "../../../nonview/base";

import { Party } from "../../../nonview/core";
import ActivePDUtils from "../../../nonview/core/ActivePDUtils";

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
  const resultIdx = electionDisplay.resultIdx;
  const resultList = election.resultList;
  const isComplete = electionDisplay.isComplete(entID, pdIdx);

  let color = "ghostwhite";
  let opacity = 1;

  const result = resultIdx[entID];
  if (isComplete && result) {
    const winningPartyID = result.partyToVotes.winningPartyID;
    color = Party.fromID(winningPartyID).color;
    opacity = Color.getOpacity(result.partyToVotes.pWinner);
  }

  const onClick = getOnClick({
    entID,
    setActivePDID,
    pdIdx,
    resultList,
  });

  const nPoints = points.length;
  const [x, y] = points[Math.floor(nPoints / 2)];

  const ent = allRegionIdx[entID];
  const label = ent.name;


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
        color={color}
        opacity={opacity}
        label={label}
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

import { Color, EntType } from "../../../nonview/base";

import { Party } from "../../../nonview/core";

import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../BasePage/BasePageHandlerProvider";

import SVGHexPolygon from "./SVGHexPolygon";
import SVGHexText from "./SVGHexText";

function getRenderedHexs({ points, color, opacity, onClick }) {
  return points.map(function ([x, y], iPoint) {
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
}

function getRenderedHexLabel({
  points,
  entID,
  allRegionIdx,
  color,
  opacity,
  onClick,
}) {
  const nPoints = points.length;
  const [x, y] = points[Math.floor(nPoints / 2)];

  const ent = allRegionIdx[entID];
  const label = ent.name;

  return (
    <SVGHexText
      x={x}
      y={y / Math.cos(Math.PI / 6)}
      color={color}
      opacity={opacity}
      label={label}
      onClick={onClick}
    />
  );
}

function getNewActivePDIDForED({resultList, pdIdx, entID}) {
  for (let result of resultList.reverse()) {
    const pdEnt = pdIdx[result.entID];
    if (pdEnt && pdEnt.d.ed_id === entID) {
      return result.entID
    }
  }
  return null;
}

function getNewActivePDIDForProvince({resultList, pdIdx, entID}) {
  for (let result of resultList.reverse()) {
    const pdEnt = pdIdx[result.entID];
    if (pdEnt && pdEnt.d.province_id === entID) {
     return result.entID
    }
  }
 return null;
}

function getNewActivePDID ({resultList, pdIdx, entID}) {
  const entType = EntType.fromID(entID);

  switch(entType) {
    case EntType.PD:
      return entID;
    case EntType.ED:
      return getNewActivePDIDForED({resultList, pdIdx, entID}) ;
    case EntType.PROVINCE:
      return getNewActivePDIDForProvince({resultList, pdIdx, entID});
    default:
      return null;
  }
}

function getOnClick({
  entID,
  setActivePDID,
  pdIdx,
  resultList,
}) {
  return function () {
    const newActivePDID = getNewActivePDID({
      resultList,
      pdIdx,
      entID,
    });
    if (newActivePDID) {
      setActivePDID(newActivePDID);
    }
  };

}

function getRenderedItem({
  entID,
  points,
  data,
  setActivePDID,
}) {
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

  return {
    renderedHexs: getRenderedHexs({
      points,
      color,
      opacity,
      onClick,
    }),
    renderedLabel: getRenderedHexLabel({
      points,
      entID,
      allRegionIdx,
      color,
      opacity,
      onClick,
    }),
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

import { Color } from "../../../nonview/base";
import { ActivePDUtils } from "../../../nonview/core";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../../view/pages/BasePage/BasePageHandlerProvider";
import SVGHexPolygonGroup from "./SVGHexPolygonGroup";
import SVGHexText from "./SVGHexText";

function getOnClick({
  entID,
  setActiveEntID,
  entIdx,
  baseResultList,
  resultIdx,
}) {
  return function () {
    const newActiveEntID = ActivePDUtils.getNewActiveEntID({
      baseResultList,
      entIdx,
      entID,
    });

    if (newActiveEntID && resultIdx[newActiveEntID]) {
      setActiveEntID(newActiveEntID);
    }
  };
}

function getRenderedItem({ entID, points, data, setActiveEntID }) {
  const { electionDisplay, allRegionIdx, electionPrevious, entIdx } = data;
  const result = electionDisplay.resultIdx[entID];

  let color = "ghostwhite";
  let opacity = 1;
  if (electionDisplay.isComplete(entID, entIdx, electionPrevious) && result) {
    color = result.color;
    opacity = Color.getOpacity(result.pWinner);
  }

  const onClick = getOnClick({
    entID,
    setActiveEntID,
    entIdx,
    baseResultList: electionDisplay.baseResultList,
    resultIdx: electionDisplay.resultIdx,
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

function getRenderedItems({ mapData, data, setActiveEntID }) {
  const { idx } = mapData;

  return Object.entries(idx).map(function ([entID, points]) {
    return getRenderedItem({
      entID,
      points,

      data,
      setActiveEntID,
    });
  });
}

export default function SVGMapHexs({ mapData }) {
  const { setActiveEntID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const renderedItems = getRenderedItems({ mapData, data, setActiveEntID });

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

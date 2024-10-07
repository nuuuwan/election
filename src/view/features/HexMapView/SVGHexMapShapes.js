import { Color } from "../../../nonview";
import { ActivePDUtils } from "../../../nonview";
import { useDataContext } from "../../../nonview/core/DataProvider";

import { useBasePageHandlerContext } from "../../pages/BasePage/BasePageHandlerProvider";
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

function getColorAndOpacity({
  electionDisplay,
  entID,
  entIdx,
  result,
  customOverlayRenderer,
}) {
  let color = "ghostwhite";
  let opacity = 1;
  if (electionDisplay.isComplete(entID, entIdx) && result) {
    color = result.color;
    opacity = Color.getOpacity(result.pWinner);
  }
  if (customOverlayRenderer) {
    color = "white";
  }
  return { color, opacity };
}

function SVGHexMapShape({
  entID,
  points,
  data,
  setActiveEntID,
  customOverlayRenderer,
}) {
  const { electionDisplay, allRegionIdx, entIdx } = data;
  const result = electionDisplay.resultIdx[entID];
  const { color, opacity } = getColorAndOpacity({
    electionDisplay,
    entID,
    entIdx,
    result,
    customOverlayRenderer,
  });
  const onClick = getOnClick({
    entID,
    setActiveEntID,
    entIdx,
    baseResultList: electionDisplay.baseResultList,
    resultIdx: electionDisplay.resultIdx,
  });
  const [x, y] = points[Math.floor(points.length / 2)];

  return (
    <g>
      <SVGHexPolygonGroup
        points={points}
        color={color}
        opacity={opacity}
        onClick={onClick}
      />
      <SVGHexText
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={Color.getTextColor(color, opacity)}
        label={customOverlayRenderer ? "" : allRegionIdx[entID].name}
        onClick={onClick}
      />
      {customOverlayRenderer
        ? customOverlayRenderer({ entID, x, y: y / Math.cos(Math.PI / 6) })
        : null}
    </g>
  );
}

export default function SVGHexMapShapes({ mapData, customOverlayRenderer }) {
  const { setActiveEntID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }

  return (
    <g>
      {Object.entries(mapData.idx).map(function ([entID, points], i) {
        return (
          <SVGHexMapShape
            key={"hex" + i}
            entID={entID}
            points={points}
            data={data}
            setActiveEntID={setActiveEntID}
            customOverlayRenderer={customOverlayRenderer}
          />
        );
      })}
    </g>
  );
}

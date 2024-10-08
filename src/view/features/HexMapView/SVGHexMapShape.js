import { Color } from "../../../nonview";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../pages/BasePage/BasePageHandlerProvider";
import { ActivePDUtils } from "../../../nonview";
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

function getColor({
  electionDisplay,
  entID,
  entIdx,
  result,
}) {
  if (electionDisplay.isComplete(entID, entIdx) && result) {
    return result.color;
  }
  return "ghostwhite";
}

function getOpacity({
  electionDisplay,
  entID,
  entIdx,
  result,

}) {
  if (electionDisplay.isComplete(entID, entIdx) && result) {
    return Color.getOpacity(result.pWinner);
  }
  return 1;
}

export default function SVGHexMapShape({
  entID,
  points,
  x,y,
  customOverlayRenderer,
}) {
  const { setActiveEntID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, allRegionIdx, entIdx } = data;
  const result = electionDisplay.resultIdx[entID];
  const isReallyComplete = electionDisplay.isComplete(entID, entIdx) && result;
  const color = isReallyComplete ? result.color : "ghostwhite";
  const opacity = isReallyComplete ? Color.getOpacity(result.pWinner) : 1;
  const onClick = getOnClick({
    entID,
    setActiveEntID,
    entIdx,
    baseResultList: electionDisplay.baseResultList,
    resultIdx: electionDisplay.resultIdx,
  });

  return (
    <g onClick={onClick}>
      <SVGHexPolygonGroup
        points={points}
        color={color}
        opacity={opacity}
      />
      {customOverlayRenderer ? null : <SVGHexText
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={Color.getTextColor(color, opacity)}
        label={allRegionIdx[entID].name}
      />}
    </g>
  );
}

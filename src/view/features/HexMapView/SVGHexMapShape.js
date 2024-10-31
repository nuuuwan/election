import { Color, ActivePDUtils } from '../../../nonview';
import { useDataContext } from '../../../nonview/core/DataProvider';
import { useBasePageHandlerContext } from '../../pages/BasePage/BasePageHandlerProvider';
import SVGHexPolygonGroup from './SVGHexPolygonGroup';
import SVGHexText from './SVGHexText';

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

export default function SVGHexMapShape({
  entID,
  points,
  x,
  y,
  customOverlayRenderer,
}) {
  const { setActiveEntID } = useBasePageHandlerContext();
  const data = useDataContext();
  const { electionDisplay, allRegionIdx, entIdx } = data;
  const result = electionDisplay.resultIdx[entID];
  const isReallyComplete = electionDisplay.isComplete(entID, entIdx) && result;
  const color = isReallyComplete ? result.color : 'ghostwhite';
  const opacity =
    (isReallyComplete ? Color.getOpacity(result.pWinner) : 1) /
    (customOverlayRenderer ? 3 : 1);
  const onClick = getOnClick({
    entID,
    setActiveEntID,
    entIdx,
    baseResultList: electionDisplay.baseResultList,
    resultIdx: electionDisplay.resultIdx,
  });
  return (
    <g
      onClick={onClick}
      style={{ cursor: isReallyComplete ? 'pointer' : 'default' }}
    >
      <SVGHexPolygonGroup points={points} color={color} opacity={opacity} />
      <SVGHexText
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={Color.getTextColor(color, opacity)}
        label={allRegionIdx[entID].name}
        isSmall={customOverlayRenderer}
      />
      )
    </g>
  );
}

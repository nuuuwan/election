import { STYLE } from "../../../nonview/constants";

import SVGTitles from "./SVGTitles";
import SVGLegendPercentages from "./SVGLegendPercentages";
import SVGLegendParty from "./SVGLegendParty";
import SVGMap from "./SVGMap";
import StyleHexagonMap from "./StyleHexagonMap";
import HexagonMapData from "./HexagonMapData";

function getBBox() {
  const mapData = HexagonMapData.getMapDataList().reduce(function (
    mapData,
    { idx }
  ) {
    return [].concat(mapData, Object.values(idx));
  },
  []);

  const [minX, minY, maxX, maxY] = Object.values(mapData).reduce(
    function ([minX, minY, maxX, maxY], points) {
      return points.reduce(
        function ([minX, minY, maxX, maxY], [x, y]) {
          return [
            Math.min(minX, x),
            Math.min(minY, y),
            Math.max(maxX, x),
            Math.max(maxY, y),
          ];
        },
        [minX, minY, maxX, maxY]
      );
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );

  return [minX - 2, minY - 2, maxX + 2, maxY + 6];
}

function getViewBox() {
  const [minX, minY, maxX, maxY] = getBBox();
  const [width, height] = [maxX - minX, maxY - minY];
  return `${minX} ${minY} ${width} ${height}`;
}

export default function HexagonMap({ election, db, setActivePDID }) {
  const resultIdx = election.resultIdx;
  const partyToWins = election.getPartyToWins();
  const nParties = Object.keys(partyToWins).length;

  return (
    <svg viewBox={getViewBox()} fontFamily={STYLE.FONT_FAMILY}>
      {HexagonMapData.getMapDataList().map(function (mapData, i) {
        return (
          <SVGMap
            key={i}
            resultIdx={resultIdx}
            mapData={mapData}
            db={db}
            setActivePDID={setActivePDID}
          />
        );
      })}
      <SVGTitles />
      <SVGLegendParty election={election} x={12} y={6} />
      <SVGLegendPercentages x={13 + nParties / StyleHexagonMap.N_COLS} y={6} />
    </svg>
  );
}

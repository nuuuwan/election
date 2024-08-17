import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";
import HEXAGON_MAP_DATA_ED from "./HEXAGON_MAP_DATA_ED";
import { STYLE } from "../../../nonview/constants";

import SVGTitles from "./SVGTitles";
import SVGLegendPercentages from "./SVGLegendPercentages";
import SVGLegendParty from "./SVGLegendParty";
import SVGMap from "./SVGMap";
import { Color } from "../../../nonview/base";

function getPDMapData() {
  return HEXAGON_MAP_DATA_PD;
}

function getEDMapData() {
  const [offsetX, offsetY] = [9, -2];
  const idx = Object.fromEntries(
    Object.entries(HEXAGON_MAP_DATA_ED.idx).map(function ([entID, [x, y]]) {
      return [entID + "P", [x + offsetX, y + offsetY]];
    })
  );
  const idx2 = Object.fromEntries(
    Object.entries(HEXAGON_MAP_DATA_ED.idx2).map(function ([entID, polygons]) {
      return [
        entID,
        polygons.map(function (polygon) {
          return polygon.map(function ([x, y]) {
            return [x + offsetX, y + offsetY];
          });
        }),
      ];
    })
  );
  return Object.assign({}, HEXAGON_MAP_DATA_ED, { idx, idx2 });
}

function getViewBox() {
  const mapData = [].concat(
    Object.values(getPDMapData().idx),
    Object.values(getEDMapData().idx)
  );
  const [minX, minY, maxX, maxY] = mapData.reduce(
    function ([minX, minY, maxX, maxY], [x, y]) {
      return [
        Math.min(minX, x),
        Math.min(minY, y),
        Math.max(maxX, x),
        Math.max(maxY, y),
      ];
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );
  const [width, height] = [maxX - minX, maxY - minY];

  return `${minX - 1} ${minY - 2} ${width + 2} ${height + 6}`;
}

export default function HexagonMap({ election, pdIdx, setActivePDID }) {
  const resultsIdx = election.resultsIdx;
  const partyToWins = election.getPartyToWins();
  const nParties = Object.keys(partyToWins).length;
  return (
    <svg
      width={"100%"}
      height={"70vh"}
      viewBox={getViewBox()}
      fontFamily={STYLE.FONT_FAMILY}
    >
      <SVGTitles />
      <SVGLegendParty election={election} x={1} y={-3} />
      <SVGLegendPercentages x={2 + nParties / Color.N_COLS} y={-3} />
      <SVGMap
        resultsIdx={resultsIdx}
        mapData={getPDMapData()}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
      <SVGMap
        resultsIdx={resultsIdx}
        mapData={getEDMapData()}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
    </svg>
  );
}

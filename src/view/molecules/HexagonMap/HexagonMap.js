import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";
import HEXAGON_MAP_DATA_ED from "./HEXAGON_MAP_DATA_ED";
import HEXAGON_MAP_DATA_PROVINCE from "./HEXAGON_MAP_DATA_PROVINCE";
import { STYLE } from "../../../nonview/constants";

import SVGTitles from "./SVGTitles";
import SVGLegendPercentages from "./SVGLegendPercentages";
import SVGLegendParty from "./SVGLegendParty";
import SVGMap from "./SVGMap";
import StyleHexagonMap from "./StyleHexagonMap";

function getPDMapData() {
  return HEXAGON_MAP_DATA_PD;
}

function offsetData(originalData, idSuffix, [offsetX, offsetY]) {
  const idx = Object.fromEntries(
    Object.entries(originalData.idx).map(function ([entID, [x, y]]) {
      return [entID + idSuffix, [x + offsetX, y + offsetY]];
    })
  );
  const idx2 = Object.fromEntries(
    Object.entries(originalData.idx2).map(function ([entID, polygons]) {
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

function getPostalPDMapData() {
  return offsetData(HEXAGON_MAP_DATA_ED, "P", [9, -0.5]);
}

function getEDMapData() {
  return offsetData(HEXAGON_MAP_DATA_ED, "", [-3, 4]);
}

function getProvinceMapData() {
  return offsetData(HEXAGON_MAP_DATA_PROVINCE, "", [-3, 16]);
}

function getMapDataList() {
  return [
    getPostalPDMapData(),
    getPDMapData(),
    getEDMapData(),
    getProvinceMapData(),
  ];
}

function getViewBox() {
  const mapData = [].concat(
    Object.values(getPostalPDMapData().idx),
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

export default function HexagonMap({ election, db, setActivePDID }) {
  const resultIdx = election.resultIdx;
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
      <SVGLegendParty election={election} x={1} y={-2} />
      <SVGLegendPercentages x={2 + nParties / StyleHexagonMap.N_COLS} y={-2} />
      {getMapDataList().map(function (mapData, i) {
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
    </svg>
  );
}

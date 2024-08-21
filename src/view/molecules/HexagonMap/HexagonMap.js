
import { STYLE } from "../../../nonview/constants";

import SVGTitles from "./SVGTitles";
import SVGLegendPercentages from "./SVGLegendPercentages";
import SVGLegendParty from "./SVGLegendParty";
import SVGMap from "./SVGMap";
import StyleHexagonMap from "./StyleHexagonMap";
import HexagonMapData from "./HexagonMapData";




function getViewBox() {
  const mapData = [].concat(
    Object.values(HexagonMapData.getPostalPDMapData().idx),
    Object.values(HexagonMapData.getPDMapData().idx),
    Object.values(HexagonMapData.getEDMapData().idx),
    Object.values(HexagonMapData.getProvinceMapData().idx),
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
    </svg>
  );
}

import SVGTitles from "./SVGTitles";
import SVGLegendPercentages from "./SVGLegendPercentages";
import SVGLegendParty from "./SVGLegendParty";
import SVGMap from "./SVGMap";
import StyleHexMap from "./StyleHexMap";
import HexMapData from "./HexMapData/HexMapData";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { THEME_DATA } from "../../_constants/THEME";

function getBBox() {
  const mapData = HexMapData.getMapDataList().reduce(function (
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

  return [minX - 5, minY - 2, maxX + 5, maxY + 4.5];
}

function getViewBox() {
  const [minX, minY, maxX, maxY] = getBBox();
  const [width, height] = [maxX - minX, maxY - minY];
  return `${minX} ${minY} ${width} ${height}`;
}

export default function HexMapView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const partyToWins = electionDisplay.getPartyToWins();
  const nParties = Object.keys(partyToWins).length;

  return (
    <svg viewBox={getViewBox()} fontFamily={THEME_DATA.typography.fontFamily}>
      <SVGTitles />
      <SVGLegendParty x={-3} y={-1} />
      <SVGLegendPercentages x={-2 + nParties / StyleHexMap.N_COLS} y={-1} />
      {HexMapData.getMapDataList().map(function (mapData, i) {
        return <SVGMap key={i} mapData={mapData} />;
      })}
    </svg>
  );
}
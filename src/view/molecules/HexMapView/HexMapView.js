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

  return [minX - 2, minY - 1, maxX + 1, maxY + 8];
}

function getViewBoxDims() {
  const [minX, minY, maxX, maxY] = getBBox();
  const [width, height] = [maxX - minX, maxY - minY];
  return [minX, minY, width, height];
}

function getViewBox() {
  const [minX, minY, width, height] = getViewBoxDims();
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

  const [minX, minY, width, height] = getViewBoxDims();

  return (
    <svg viewBox={getViewBox()} fontFamily={THEME_DATA.typography.fontFamily}>
      <rect x={minX} y={minY} width={width} height={height} fill={"#fff"} />

      {HexMapData.getMapDataList().map(function (mapData, i) {
        return <SVGMap key={i} mapData={mapData} />;
      })}

      <SVGTitles />
      <SVGLegendParty x={9} y={3} />
      <SVGLegendPercentages x={10 + nParties / StyleHexMap.N_COLS} y={3} />
    </svg>
  );
}

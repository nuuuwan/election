import SVGMapHexs from "./SVGMapHexs";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData }) {
  return (
    <g>
      <SVGMapHexs mapData={mapData} />
      <SVGMapBoundaries mapData={mapData} />
    </g>
  );
}

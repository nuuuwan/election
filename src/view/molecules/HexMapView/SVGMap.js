import SVGMapHexs from "./SVGMapHexs";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData }) {
  return (
    <g>
      {" "}
      <SVGMapBoundaries mapData={mapData} />
      <SVGMapHexs mapData={mapData} />
    </g>
  );
}

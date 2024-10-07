import SVGHexMapShapes from "./SVGHexMapShapes";
import SVGHexMapBoundaries from "./SVGHexMapBoundaries";

export default function SVGHexMap({ mapData }) {
  return (
    <g>
      <SVGHexMapShapes mapData={mapData} />
      <SVGHexMapBoundaries mapData={mapData} />
    </g>
  );
}

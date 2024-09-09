import SVGMapHexagons from "./SVGMapHexagons";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData }) {
  return (
    <g>
      {" "}
      <SVGMapBoundaries mapData={mapData} />
      <SVGMapHexagons mapData={mapData} />
    </g>
  );
}

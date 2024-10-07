import SVGHexMapShapes from "./SVGHexMapShapes";
import SVGHexMapBoundaries from "./SVGHexMapBoundaries";

export default function SVGHexMap({ mapData, customOverlayRenderer }) {
  return (
    <g>
      <SVGHexMapShapes mapData={mapData} customOverlayRenderer={customOverlayRenderer} />
      <SVGHexMapBoundaries mapData={mapData} />
    </g>
  );
}

import SVGMapHexagons from "./SVGMapHexagons";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData, resultsIdx, pdIdx, setActivePDID }) {
  return (
    <g>
      <SVGMapHexagons
        mapData={mapData}
        resultsIdx={resultsIdx}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
      <SVGMapBoundaries mapData={mapData} />
    </g>
  );
}

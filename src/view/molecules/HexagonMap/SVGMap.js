import SVGMapHexagons from "./SVGMapHexagons";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData, resultIdx, pdIdx, setActivePDID }) {
  return (
    <g>
      <SVGMapHexagons
        mapData={mapData}
        resultIdx={resultIdx}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
      <SVGMapBoundaries mapData={mapData} />
    </g>
  );
}

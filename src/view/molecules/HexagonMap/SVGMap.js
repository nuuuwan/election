import SVGMapHexagons from "./SVGMapHexagons";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData, resultIdx, db, setActivePDID }) {
  return (
    <g>
      <SVGMapHexagons
        mapData={mapData}
        resultIdx={resultIdx}
        db={db}
        setActivePDID={setActivePDID}
      />
      <SVGMapBoundaries mapData={mapData} />
    </g>
  );
}

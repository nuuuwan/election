import SVGMapHexagons from "./SVGMapHexagons";
import SVGMapBoundaries from "./SVGMapBoundaries";

export default function SVGMap({ mapData,  setActivePDID }) {
  return (
    <g>
      {" "}
      <SVGMapBoundaries mapData={mapData} />
      <SVGMapHexagons
        mapData={mapData}

        setActivePDID={setActivePDID}
      />
    </g>
  );
}

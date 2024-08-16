import { STYLE } from "../../../nonview/constants";
export default function SVGMapBoundaries({ mapData }) {
  const { idx2 } = mapData;
  return Object.entries(idx2).map(function ([entID, polygons]) {
    return polygons.map(function (polygon) {
      return (
        <polygon
          key={entID}
          points={polygon
            .map(function ([x, y]) {
              return `${x},${y / Math.cos(Math.PI / 6)}`;
            })
            .join(" ")}
          fill="none"
          stroke={STYLE.COLOR.DARKER}
          strokeWidth={0.1}
        />
      );
    });
  });
}

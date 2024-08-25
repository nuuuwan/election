import { STYLE } from "../../../nonview/constants";
export default function SVGMapBoundaries({ mapData }) {
  const { idx2 } = mapData;

const nGroups = Object.keys(idx2).length;
  return Object.entries(idx2).map(
    function([groupType, groupIDToPolygons], iGroup) {

      const strokeWidth = [1, 0.7, 0.3][nGroups - iGroup - 1] * 0.15;

      return Object.entries(groupIDToPolygons).map(function ([groupID, polygons]) {
        return polygons.map(function (polygon) {
          return (
            <polygon
              key={groupID}
              points={polygon
                .map(function ([x, y]) {
                  return `${x},${y / Math.cos(Math.PI / 6)}`;
                })
                .join(" ")}
              fill="none"
              stroke={STYLE.COLOR.DARKER}
              strokeWidth={strokeWidth}
            />
          );
        });
      });
    }
  )


}

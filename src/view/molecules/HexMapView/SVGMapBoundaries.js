export default function SVGMapBoundaries({ mapData }) {
  const { idx2 } = mapData;

  const nGroups = Object.keys(idx2).length;
  return Object.entries(idx2).map(function (
    [groupType, groupIDToPolygons],
    iGroup
  ) {
    const iStyle = nGroups - iGroup - 1;
    const strokeWidth = [1, 0.6, 0.36][iStyle] * 0.1;
    const stroke = "black";

    return Object.entries(groupIDToPolygons).map(function ([
      groupID,
      polygons,
    ]) {
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
            stroke={stroke}
            strokeWidth={strokeWidth}
          />
        );
      });
    });
  });
}

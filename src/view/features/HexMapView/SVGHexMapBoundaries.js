export default function SVGHexMapBoundaries({ mapData }) {
  const { idx2 } = mapData;

  return Object.entries(idx2).map(function (
    [groupType, groupIDToPolygons],
    iGroup
  ) {
    const strokeWidth = 0.05;
    const stroke = ['#888', '#444', '#000'][iGroup];

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

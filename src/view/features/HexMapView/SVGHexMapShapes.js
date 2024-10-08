import SVGHexMapShape from "./SVGHexMapShape";

export default function SVGHexMapShapes({ mapData, customOverlayRenderer }) {
  return (
    <g>
      {Object.entries(mapData.idx).map(function ([entID, points], i) {
        const [x, y] = points[Math.floor(points.length / 2)];

        return (
          <g>
            <SVGHexMapShape
              key={"hex" + i}
              entID={entID}
              points={points}
              x={x}
              y={y}
              customOverlayRenderer={customOverlayRenderer}
            />
            {customOverlayRenderer
              ? customOverlayRenderer({
                  entID,
                  x,
                  y: y / Math.cos(Math.PI / 6),
                })
              : null}
          </g>
        );
      })}
    </g>
  );
}

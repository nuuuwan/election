import SVGHexPolygon from "./SVGHexPolygon";

export default function SVGHexPolygonGroup({
    points,
    color,
    opacity,
    onClick,
}) {
    return (
        <g>
            {points.map(function ([x, y], iPoint) {
                return (
                    <SVGHexPolygon
                        key={iPoint}
                        x={x}
                        y={y / Math.cos(Math.PI / 6)}
                        color={color}
                        opacity={opacity}
                        onClick={onClick}
                    />
                );
            })}
        </g>
    );
}

import { Color, EntType, Format } from "../../../nonview";
import { THEME_DATA } from "../../_constants/THEME";

import SVGHexPolygon from "./SVGHexPolygon";
import SVGHexText from "./SVGHexText";

function getXY(baseEntType, nParties) {
    switch (baseEntType) {
    case EntType.PD:
        return { x: 9 + nParties / THEME_DATA.HEXMAP.N_COLS, y: 3 };
    case EntType.ED:
        return { x: 6 + 2 / THEME_DATA.HEXMAP.N_COLS, y: 2 };
    default:
        throw new Error("Unknown baseEntType: " + baseEntType);
    }
}

export default function SVGLegendPercentages({ baseEntType, nParties }) {
    const N_COLS = 2;

    const { x, y } = getXY(baseEntType, nParties);

    return [0.5, 0.6, 0.7].map(function (p, i) {
        const [x1, y1] = [
            x + parseInt(i / N_COLS),
            y +
        ((i % N_COLS) + (parseInt(i / N_COLS) % 2 === 1 ? 0.5 : 0)) /
          Math.cos(Math.PI / 6),
        ];

        const opacity = Color.getOpacity(p);

        return (
            <g key={i}>
                <SVGHexPolygon
                    key={i}
                    x={x1}
                    y={y1}
                    color={"black"}
                    label={Format.percent(p)}
                    opacity={opacity}
                />
                <SVGHexText
                    x={x1}
                    y={y1}
                    label={Format.percent(p)}
                    color={Color.getTextColor("black", opacity)}
                />
            </g>
        );
    });
}

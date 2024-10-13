import SVGTitles from "./SVGTitles";
import SVGLegendPercentages from "./SVGLegendPercentages";
import SVGLegendParty from "./SVGLegendParty";
import SVGHexMap from "./SVGHexMap";
import HexMapData from "./HexMapData/HexMapData";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { THEME_DATA } from "../../_constants/THEME";
import { EntType } from "../../../nonview";

function getBBox(baseEntType) {
    const mapData = HexMapData.getMapDataList(baseEntType).reduce(function (
        mapData,
        { idx }
    ) {
        return [].concat(mapData, Object.values(idx));
    },
    []);

    const [minX, minY, maxX, maxY] = Object.values(mapData).reduce(
        function ([minX, minY, maxX, maxY], points) {
            return points.reduce(
                function ([minX, minY, maxX, maxY], [x, y]) {
                    return [
                        Math.min(minX, x),
                        Math.min(minY, y),
                        Math.max(maxX, x),
                        Math.max(maxY, y),
                    ];
                },
                [minX, minY, maxX, maxY]
            );
        },
        [Infinity, Infinity, -Infinity, -Infinity]
    );

    const paddingMaxY = baseEntType === EntType.PD ? 4 : 2;
    return [minX - 2, minY - 1, maxX + 1, maxY + paddingMaxY];
}

function getViewBoxDims(baseEntType) {
    const [minX, minY, maxX, maxY] = getBBox(baseEntType);
    const [width, height] = [maxX - minX, maxY - minY];
    return [minX, minY, width, height];
}

function getViewBox(baseEntType) {
    const [minX, minY, width, height] = getViewBoxDims(baseEntType);
    return `${minX} ${minY} ${width} ${height}`;
}

export default function HexMapView() {
    const data = useDataContext();
    const { electionDisplay } = data;

    const partyToWins = electionDisplay.getPartyToWins();
    const nParties = Object.keys(partyToWins).length;

    return (
        <svg
            viewBox={getViewBox(electionDisplay.baseEntType)}
            fontFamily={THEME_DATA.typography.fontFamily}
        >
            {HexMapData.getMapDataList(electionDisplay.baseEntType).map(function (
                mapData,
                i
            ) {
                return <SVGHexMap key={i} mapData={mapData} />;
            })}

            <SVGTitles baseEntType={electionDisplay.baseEntType} />
            <SVGLegendParty baseEntType={electionDisplay.baseEntType} />
            <SVGLegendPercentages
                baseEntType={electionDisplay.baseEntType}
                nParties={nParties}
            />
        </svg>
    );
}

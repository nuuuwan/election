import { Format, MathX } from "../../../nonview/base";
import { Party } from "../../../nonview/core";
import HEXAGON_MAP_DATA_PD from "./HEXAGON_MAP_DATA_PD";
import HEXAGON_MAP_DATA_ED from "./HEXAGON_MAP_DATA_ED";
import { STYLE } from "../../../nonview/constants";
const N_COLS = 2;

function SVGHexagon({ x, y, color, label, opacity, onClick }) {
  const N_SIDES = 6;

  const radius = 1 / Math.cos(Math.PI / 6) ** 2 / 2;
  const points = MathX.range(0, N_SIDES)
    .map(function (i) {
      const angle = (i * Math.PI * 2) / N_SIDES;
      return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
    })
    .map(function ([x, y]) {
      return `${x},${y}`;
    })
    .join(" ");

  const textColor =
    color === STYLE.COLOR.LIGHTEST
      ? STYLE.COLOR.LIGHTER
      : opacity > 0.5
      ? "white"
      : "black";

  return (
    <g onClick={onClick}>
      <polygon
        points={points}
        fill={color}
        opacity={opacity}
        stroke={STYLE.COLOR.LIGHTER}
        strokeWidth={0.05}
      />
      <text
        x={x}
        y={y + 0.1}
        fontSize={(0.4 * 3) / Math.max(3, label.length)}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={textColor}
      >
        {label}
      </text>
    </g>
  );
}

function SVGTitles() {
  return (
    <g fontSize={0.5} textAnchor="middle" fill={STYLE.COLOR.LIGHT}>
      <text x={11} y={-4}>
        {"22 Postal Votes".toUpperCase()}
      </text>
      <text x={5} y={1}>
        {"160 Polling Divisions".toUpperCase()}
      </text>
    </g>
  );
}

function SVGLegendPercentages({ x, y }) {
  const N_COLS = 2;
  return [0.25, 0.5, 0.75].map(function (p, i) {
    return (
      <SVGHexagon
        key={i}
        x={x + parseInt(i / N_COLS)}
        y={
          y +
          ((i % N_COLS) + (parseInt(i / N_COLS) % 2 === 1 ? 0.5 : 0)) /
            Math.cos(Math.PI / 6)
        }
        color={STYLE.COLOR.LIGHT}
        label={Format.percent(p)}
        opacity={getOpacity(p)}
      />
    );
  });
}

function getPartyToWins(resultsIdx) {
  return Object.values(resultsIdx).reduce(function (partyToWins, result) {
    const winningPartyID = result.partyToVotes.winningPartyID;
    if (!partyToWins[winningPartyID]) {
      partyToWins[winningPartyID] = 0;
    }
    partyToWins[winningPartyID]++;
    return partyToWins;
  }, {});
}

function SVGLegendParty({ resultsIdx, x, y }) {
  const partyToWins = getPartyToWins(resultsIdx);

  return Object.entries(partyToWins)
    .sort(function ([partyID1, nWins1], [partyID2, nWins2]) {
      return nWins2 - nWins1;
    })
    .map(function ([partyID, nWins], i) {
      const party = Party.fromID(partyID);
      return (
        <SVGHexagon
          key={partyID}
          x={x + parseInt(i / N_COLS)}
          y={
            y +
            ((i % N_COLS) + (parseInt(i / N_COLS) % 2 === 1 ? 0.5 : 0)) /
              Math.cos(Math.PI / 6)
          }
          color={party.color}
          label={partyID}
          opacity={1}
        />
      );
    });
}

function getOpacity(p) {
  const [minOpacity, maxOpacity] = [0.2, 0.4];
  const [minP, maxP] = [0.45, 0.55];
  const p2 = MathX.forceRange((p - minP) / (maxP - minP), 0, 1);
  return minOpacity + (maxOpacity - minOpacity) * p2;
}

function replaceLowercaseVowels(str) {
  return str.replace(/[aeiou]/g, "");
}

function getLabel(name) {
  name = name.replace("Postal ", "");
  name = replaceLowercaseVowels(name);
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 3).toUpperCase();
  }
  return words.map((word) => word.substring(0, 1)).join("");
}

function getPDMapData() {
  return HEXAGON_MAP_DATA_PD;
}

function getEDMapData() {
  const [offsetX, offsetY] = [9, -2];
  const idx = Object.fromEntries(
    Object.entries(HEXAGON_MAP_DATA_ED.idx).map(function ([entID, [x, y]]) {
      return [entID + "P", [x + offsetX, y + offsetY]];
    })
  );
  const idx2 = Object.fromEntries(
    Object.entries(HEXAGON_MAP_DATA_ED.idx2).map(function ([entID, polygons]) {
      return [
        entID,
        polygons.map(function (polygon) {
          return polygon.map(function ([x, y]) {
            return [x + offsetX, y + offsetY];
          });
        }),
      ];
    })
  );
  return Object.assign({}, HEXAGON_MAP_DATA_ED, { idx, idx2 });
}

function SVGMapHexagons({ mapData, resultsIdx, pdIdx, setActivePDID }) {
  const { idx } = mapData;
  return Object.entries(idx).map(function ([entID, [x, y]]) {
    const result = resultsIdx[entID];
    const ent = pdIdx[entID];
    const label = getLabel(ent.name);

    let color = STYLE.COLOR.LIGHTEST;
    let opacity = 1;

    if (result) {
      const winningPartyID = result.partyToVotes.winningPartyID;
      color = Party.fromID(winningPartyID).color;
      opacity = getOpacity(result.partyToVotes.pWinner);
    }

    const onClick = function () {
      setActivePDID(entID);
    };

    return (
      <SVGHexagon
        key={entID}
        x={x}
        y={y / Math.cos(Math.PI / 6)}
        color={color}
        opacity={opacity}
        label={label}
        onClick={onClick}
      />
    );
  });
}

function SVGMapBoundaries({ mapData, resultsIdx, pdIdx }) {
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

function SVGMap({ mapData, resultsIdx, pdIdx, setActivePDID }) {
  return (
    <g>
      <SVGMapHexagons
        mapData={mapData}
        resultsIdx={resultsIdx}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
      <SVGMapBoundaries mapData={mapData} />
    </g>
  );
}

function getViewBox() {
  const mapData = [].concat(
    Object.values(getPDMapData().idx),
    Object.values(getEDMapData().idx)
  );
  const [minX, minY, maxX, maxY] = mapData.reduce(
    function ([minX, minY, maxX, maxY], [x, y]) {
      return [
        Math.min(minX, x),
        Math.min(minY, y),
        Math.max(maxX, x),
        Math.max(maxY, y),
      ];
    },
    [Infinity, Infinity, -Infinity, -Infinity]
  );
  const [width, height] = [maxX - minX, maxY - minY];

  return `${minX - 1} ${minY - 2} ${width + 2} ${height + 6}`;
}

export default function HexagonMap({ resultsIdx, pdIdx, setActivePDID }) {
  const partyToWins = getPartyToWins(resultsIdx);
  const nParties = Object.keys(partyToWins).length;
  return (
    <svg
      width={"100%"}
      height={"70vh"}
      viewBox={getViewBox()}
      fontFamily={STYLE.FONT_FAMILY}
    >
      <SVGTitles />
      <SVGLegendParty resultsIdx={resultsIdx} x={1} y={-3} />
      <SVGLegendPercentages x={2 + nParties / N_COLS} y={-3} />
      <SVGMap
        resultsIdx={resultsIdx}
        mapData={getPDMapData()}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
      <SVGMap
        resultsIdx={resultsIdx}
        mapData={getEDMapData()}
        pdIdx={pdIdx}
        setActivePDID={setActivePDID}
      />
    </svg>
  );
}

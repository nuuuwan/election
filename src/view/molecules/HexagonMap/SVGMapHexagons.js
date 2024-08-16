import { STYLE } from "../../../nonview/constants";
import { Party } from "../../../nonview/core";
import HexagonUtils from "./HexagonUtils";
import SVGHexagon from "./SVGHexagon";

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

export default function SVGMapHexagons({
  mapData,
  resultsIdx,
  pdIdx,
  setActivePDID,
}) {
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
      opacity = HexagonUtils.getOpacity(result.partyToVotes.pWinner);
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

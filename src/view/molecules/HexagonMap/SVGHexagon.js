import { Color, MathX, Translate } from "../../../nonview/base";

import { STYLE } from "../../../nonview/constants";

function replaceLowercaseVowels(str) {
  return str.replace(/[aeiou]/g, "");
}

function getShortLabelEn(name) {
  name = replaceLowercaseVowels(name);
  const words = name.split(" ");
  if (words.length === 1) {
    return name.substring(0, 3).toUpperCase();
  }
  return words.map((word) => word.substring(0, 1)).join("");
}

function isConsonentSi(char) {
  return /^[ක-ෆඅ-උ]$/.test(char);
}

function getShortWordSi(word, maxConsonents) {
  const n = word.length;
  let i = 0;
  let nConsonents = 0;
  for (i = 0; i < n; i++) {
    const char = word.charAt(i);
    console.debug({i, char})
    if (isConsonentSi(char)) {
      nConsonents++;
      if (nConsonents > maxConsonents) {
        break;
      }
    }
  }
  const shortWord =  word.substring(0, i);
  return shortWord;
}

function getShortLabelSi(name) {
  const words = name.split(" ");
  if (words.length === 1) {
    return getShortWordSi(name, 2);
  }
  return words.map((word) => getShortWordSi(word, 1)).join("");
 
}

function isEn(name) {
  return /^[a-zA-Z]+$/.test(name.split(" ")[0]);
}

function getShortLabel(name) {
  if (isEn(name)) {
    return getShortLabelEn(name);
  }
  return getShortLabelSi(name);
}

function getPoints(x, y, radius) {
  const N_SIDES = 6;

  return MathX.range(0, N_SIDES)
    .map(function (i) {
      const angle = (i * Math.PI * 2) / N_SIDES;
      return [x + radius * Math.cos(angle), y + radius * Math.sin(angle)];
    })
    .map(function ([x, y]) {
      return `${x},${y}`;
    })
    .join(" ");
}

function getFontSize(shortLabel) {
  const k = isEn(shortLabel) ? 1.2 : 2.7;
  const nMax = isEn(shortLabel) ? 3 : 6;
  return k / Math.max(shortLabel.length, nMax);
}

export default function SVGHexagon({ x, y, color, label, opacity, onClick }) {
  const radius = 1 / Math.cos(Math.PI / 6) ** 2 / 2;
  const points = getPoints(x, y, radius);
  const textColor = Color.getTextColor(color, opacity);
  label = label.replace("Postal ", "");
  const translatedLabel = Translate(label);
  const shortLabel = getShortLabel(translatedLabel);
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
        fontSize={getFontSize(shortLabel)}
        textAnchor="middle"
        alignmentBaseline="middle"
        fill={textColor}
      >
        <title>{translatedLabel}</title>
        {shortLabel}
      </text>
    </g>
  );
}

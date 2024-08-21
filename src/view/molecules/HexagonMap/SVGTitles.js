import { Translate } from "../../../nonview/base";
import { STYLE } from "../../../nonview/constants";

const TITLE_INFO_LIST = [
  { title: "Postal Votes", x: 8.5, y: -2 },
  { title: "Polling Divisions", x: 2.75, y: 1.25 },
  { title: "Electoral Districts", x: -3.5, y: 3 },
  { title: "Provinces", x: -3.5, y: 18 },
];

export default function SVGTitles() {
  return (
    <g fontSize={0.33} textAnchor="start" fill={STYLE.COLOR.LIGHT}>
      {TITLE_INFO_LIST.map(function ({ title, x, y }, i) {
        return (
          <text key={i} x={x} y={y}>
            {Translate(title).toUpperCase()}
          </text>
        );
      })}
    </g>
  );
}

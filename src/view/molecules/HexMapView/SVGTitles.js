import { Translate } from "../../../nonview/base";

const TITLE_INFO_LIST = [
  { title: "Postal Votes", x: 10, y: -1 },
  { title: "Polling Divisions", x: 2, y: 1.5 },
  { title: "Electoral Districts", x: -4, y: 1.5 },
  { title: "Provinces", x: -4, y: 18 },
];

export default function SVGTitles() {
  return (
    <g fontSize={0.5} textAnchor="start" fill={"secondary"}>
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

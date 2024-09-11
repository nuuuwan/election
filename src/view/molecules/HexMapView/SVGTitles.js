import { Translate } from "../../../nonview/base";

const TITLE_INFO_LIST = [
  { title: "P. Divisions", x: 3, y: 1.5 },
  { title: "Postal Votes", x: -4.5, y: 1.75},
  { title: "E. Districts", x: -4.5, y: 15.5 },
  { title: "Provinces", x: -4.5, y: 10.5 },
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

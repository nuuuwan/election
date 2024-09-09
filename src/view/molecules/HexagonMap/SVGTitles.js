import { Translate } from "../../../nonview/base";


const TITLE_INFO_LIST = [
  { title: "Postal Votes", x: 17, y: 4.5 },
  { title: "Polling Divisions", x: 6, y: 4.5 },
  { title: "Electoral Districts", x: -2, y: 4.5 },
  { title: "Provinces", x: -2, y: 15 },
];

export default function SVGTitles() {
  return (
    <g fontSize={0.67} textAnchor="start" fill={"secondary"}>
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

import { STYLE } from "../../../nonview/constants";

export default function SVGTitles() {
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

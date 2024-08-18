import { STYLE } from "../../../nonview/constants";

export default function SVGTitles() {
  return (
    <g fontSize={0.33} textAnchor="start" fill={STYLE.COLOR.LIGHT}>
      <text x={8.5} y={-2}>
        {"Postal Votes".toUpperCase()}
      </text>
      <text x={2.75} y={1.25}>
        {"Polling Divisions".toUpperCase()}
      </text>
      <text x={-3.5} y={3}>
        {"Electoral Districts".toUpperCase()}
      </text>

      <text x={-3.5} y={18}>
        {"Provinces".toUpperCase()}
      </text>
    </g>
  );
}

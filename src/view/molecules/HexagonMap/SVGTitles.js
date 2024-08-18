import { STYLE } from "../../../nonview/constants";

export default function SVGTitles() {
  return (
    <g fontSize={0.5} textAnchor="middle" fill={STYLE.COLOR.LIGHT}>
      <text x={10.5} y={-2.5}>
        {"22 Postal Votes".toUpperCase()}
      </text>
      <text x={4} y={1}>
        {"160 Polling Divisions".toUpperCase()}
      </text>
      <text x={-2} y={3}>
        {"22 Districts".toUpperCase()}
      </text>

      <text x={-2.5} y={18}>
        {"9 Prov.s".toUpperCase()}
      </text>
    </g>
  );
}

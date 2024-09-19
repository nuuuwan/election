import { Translate, EntType } from "../../../nonview/base";

function getTitleInfoList(baseEntType) {
  switch(baseEntType) {
    case EntType.PD:
    return [
      { title: "Polling Divisions", x: 3, y: 1.5 },
      { title: "Postal Votes", x: -4.5, y: 1.75 },
      { title: "E. Districts", x: -4.5, y: 15.5 },
      { title: "Provinces", x: -4.5, y: 10.5 },
    ];
    case EntType.ED:
    return [
      { title: "E. Districts", x: 0.5, y: -0.5 },
      { title: "Provinces", x: 5.5, y: 4.5 },
    ];
    default:
      throw new Error("Unknown baseEntType: " + baseEntType);
  }


}

export default function SVGTitles({baseEntType}) {


    return (
    <g fontSize={0.5} textAnchor="start" fill={"gray"}>
      {getTitleInfoList(baseEntType).map(function ({ title, x, y }, i) {
        return (
          <text key={i} x={x} y={y}>
            {Translate(title)}
          </text>
        );
      })}
    </g>
  );
}

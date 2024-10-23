import { Format, Party } from "../../nonview";

import SVGBarChart from "../base/SVGBarChart.js/SVGBarChart";

export default function ResultBarChart({ partyToPVotes }) {

  return (
    <SVGBarChart
      dataList={[partyToPVotes]}
      getValues={function (partyToPVotes) {
        return Object.values(partyToPVotes);
      }}
      getColor={function (partyToPVotes, i, pVotes, j) {
        const partyID = Object.keys(partyToPVotes)[j];
        return Party.fromID(partyID).color;
      }}
      formatValue={function (partyToPVotes, i, pVotes) {
        return Format.percent(pVotes);
      }}
      sx={{ width: 200, height: 50 }}
    />
  );
}

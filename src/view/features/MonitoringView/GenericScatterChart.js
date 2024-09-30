

import {  Translate, Format, Color } from "../../../nonview";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { CustomAlert } from "../..";
import { ScatterChart } from "@mui/x-charts";
import { Party } from "../../../nonview";



export default function GenericScatterChart({ getValue, formatStat }) {
  const data = useDataContext();
  if (data === null) {
    return null;
  }
  const { electionDisplay, electionPrevious, allRegionIdx } = data;

  if (!electionPrevious) {
    return (
      <CustomAlert severity="warning">
        {Translate("No previous election data available")}
      </CustomAlert>
    );
  }

  const baseData = electionDisplay.baseResultList
    .filter(function (result) {
      return !result.entID.endsWith("P") && allRegionIdx[result.entID];
    })
    .map(function (result) {
      const ent = allRegionIdx[result.entID];
      const prevResult = electionPrevious.getResult(result.entID);
      return {
        id: result.entID,
        y: getValue(result),
        x: prevResult ? getValue(prevResult) : 0,
        label: ent.name,
        winningPartyID: result.winningPartyID,
      };
    });

  function formatStatInner(x) {
    if (!x) {
      return "N/A";
    }
    return formatStat(x);
  }

  const valueFormatter = function (datum) {
    const percentChange = (datum.y - datum.x) / datum.x;
    const arrow = datum.y > datum.x ? "↑" : "↓";
    return `${datum.label} (${datum.winningPartyID}) ${formatStatInner(
      datum.x
    )} ${arrow} ${formatStatInner(datum.y)} (${Format.percentSigned(
      percentChange
    )})`;
  };

  const series = Object.values(
    baseData.reduce(function (idx, datum) {
      const winningPartyID = datum.winningPartyID;
      if (!idx[winningPartyID]) {
        idx[winningPartyID] = [];
      }
      idx[winningPartyID].push(datum);
      return idx;
    }, {})
  ).map(function (data) {
    const color = Color.getColorWithAlpha(
      Party.fromID(data[0].winningPartyID).color,
      0.5
    );
    return { data, color, valueFormatter };
  });

  return (
    <ScatterChart
      xAxis={[
        {
          scaleType: "linear",
          label: electionPrevious.year,
          valueFormatter: formatStatInner,
        },
      ]}
      yAxis={[
        {
          scaleType: "linear",
          label: electionPrevious.year,
          valueFormatter: formatStatInner,
        },
      ]}
      series={series}
      width={600}
      height={600}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}



import { Stack, Typography } from "@mui/material";

import { MathX, Translate, Format, Color } from "../../nonview";
import { useDataContext } from "../../nonview/core/DataProvider";
import { CustomAlert } from "..";
import { BarChart, ScatterChart } from "@mui/x-charts";
import { Election, Party } from "../../nonview";
import { X } from "@mui/icons-material";

function BanfordView() {
  const data = useDataContext();
  if (data === null) {
    return null;
  }
  const { electionDisplay } = data;

  const numList = electionDisplay.baseResultList.reduce(function (
    numList,
    result
  ) {
    const votes = Object.values(result.partyToVotes.partyToVotes);
    return numList.concat(votes);
  },
  []);
  const leadToN = numList.reduce(function (leadToN, num) {
    const lead = parseInt(num.toString()[0]);
    if (lead > 0) {
      leadToN[lead] = leadToN[lead] + 1 || 1;
    }
    return leadToN;
  }, {});

  const totalN = MathX.sum(Object.values(leadToN));
  const leadToP = Object.fromEntries(
    Object.entries(leadToN).map(([lead, n]) => [lead, n / totalN])
  );

  const dataset = Object.entries(leadToP).map(([lead, p]) => ({ lead, p }));

  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography variant="h5">Benford's Law</Typography>
      <CustomAlert>
        {Translate(
          "Benford's law is an observation that in many real-life sets of numerical data (including votes in elections), the leading digit is likely to be small. The number 1 appears as the leading significant digit about 30% of the time, while 9 appears as the leading significant digit less than 5% of the time."
        )}
      </CustomAlert>
      <BarChart
        dataset={dataset}
        yAxis={[
          {
            scaleType: "linear",
            dataKey: "p",
            valueFormatter: (p) => Format.percentFixed(p),
          },
        ]}
        xAxis={[
          {
            scaleType: "band",
            dataKey: "lead",
            label:
              Translate("Leading digit of votes received by parties") +
              ` (n=${totalN})`,
          },
        ]}
        series={[
          { dataKey: "p", valueFormatter: (p) => Format.percentFixed(p) },
        ]}
        width={600}
        height={400}
        grid={{ vertical: true, horizontal: true }}
      />
    </Stack>
  );
}

function GenericScatterChart({ getValue, formatStat }) {
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

function TurnoutView() {
  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography variant="h5">Turnout</Typography>
      <CustomAlert>
        {Translate(
          "Abruptly high voter turnout in specific regions or polling stations, especially if the rates are highly inconsistent with historical trends, could be suspicious."
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.pTurnout}
        formatStat={Format.percentFixed}
      />
    </Stack>
  );
}

function RejectedView() {
  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography variant="h5">Rejected Votes</Typography>
      <CustomAlert>
        {Translate(
          "A high percentage of spoiled or rejected ballots in certain areas could indicate attempts to suppress or manipulate results."
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.pRejected}
        formatStat={Format.percentFixed}
      />
    </Stack>
  );
}

function ElectorsView() {
  return (
    <Stack direction="column" sx={{ alignItems: "center" }}>
      <Typography variant="h5">Registered Voters</Typography>
      <CustomAlert>
        {Translate(
          "An abnormal change in the number of registered voters across elections could be suspicious."
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.electors}
        formatStat={Format.intHumanize}
      />
    </Stack>
  );
}

export default function MonitoringView() {
  return (
    <Stack direction="column" gap={3}>
      <Typography variant="h4">{Translate("Monitoring")}</Typography>
      <BanfordView />
      <TurnoutView />
      <RejectedView />
      <ElectorsView />
    </Stack>
  );
}
import { Translate, Format, Color, Party } from '../../../nonview';
import { CustomAlert, WaterMark } from '../..';
import { ScatterChart } from '@mui/x-charts';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';

function getBaseData(data, getValue) {
  const { electionDisplay, electionPrevious, allRegionIdx } = data;
  return electionDisplay.baseResultList
    .filter(function (result) {
      return !result.entID.endsWith('P') && allRegionIdx[result.entID];
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
}

function getSeries(baseData, valueFormatter) {
  return Object.values(
    baseData.reduce(function (idx, datum) {
      const winningPartyID = datum.winningPartyID;
      if (!idx[winningPartyID]) {
        idx[winningPartyID] = [];
      }
      idx[winningPartyID].push(datum);
      return idx;
    }, {}),
  ).map(function (data) {
    const color = Color.getColorWithAlpha(
      Party.fromID(data[0].winningPartyID).color,
      0.5,
    );
    return { data, color, valueFormatter };
  });
}

function getFormatStatInner(formatStat) {
  return function (x) {
    if (!x) {
      return 'N/A';
    }
    return formatStat(x);
  };
}

function getValueFormatter(formatStatInner) {
  return function (datum) {
    const percentChange = (datum.y - datum.x) / datum.x;
    const arrow = datum.y > datum.x ? '↑' : '↓';
    return `${datum.label} (${datum.winningPartyID}) ${formatStatInner(
      datum.x,
    )} ${arrow} ${formatStatInner(datum.y)} (${Format.percentSigned(
      percentChange,
    )})`;
  };
}

function getGenericAxis(election, formatStatInner) {
  return [
    {
      scaleType: 'linear',
      label: election.year,
      valueFormatter: formatStatInner,
    },
  ];
}

export default function GenericScatterChart({
  getValue,
  formatStat,
  idPrefix,
}) {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const { electionDisplay, electionPrevious } = data;
  if (!electionPrevious) {
    return (
      <CustomAlert severity="warning">
        {Translate('No previous election data available')}
      </CustomAlert>
    );
  }

  const baseData = getBaseData(data, getValue);
  const formatStatInner = getFormatStatInner(formatStat);
  const valueFormatter = getValueFormatter(formatStatInner);
  const series = getSeries(baseData, valueFormatter);

  return (
    <WaterMark id={'generic-scatter-chart' + idPrefix}>
      <ScatterChart
        xAxis={getGenericAxis(electionPrevious, formatStatInner)}
        yAxis={getGenericAxis(electionDisplay, formatStatInner)}
        series={series}
        width={600}
        height={600}
        grid={{ vertical: true, horizontal: true }}
      />
    </WaterMark>
  );
}

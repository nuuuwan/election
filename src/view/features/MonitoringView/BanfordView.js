import { Stack } from '@mui/material';

import { MathX, Translate, Format } from '../../../nonview';
import { useDataContext } from '../../../nonview/core/DataProvider';
import { CustomAlert } from '../..';
import { BarChart } from '@mui/x-charts';

function getDataSet(data) {
  const { electionDisplay } = data;

  const numList = electionDisplay.baseResultList.reduce(function (
    numList,
    result,
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
    Object.entries(leadToN).map(([lead, n]) => [lead, n / totalN]),
  );

  const dataset = Object.entries(leadToP).map(([lead, p]) => ({ lead, p }));
  return { dataset, totalN };
}

function BanfordBarChart() {
  const data = useDataContext();

  const { dataset, totalN } = getDataSet(data);

  return (
    <BarChart
      dataset={dataset}
      yAxis={[
        {
          scaleType: 'linear',
          dataKey: 'p',
          valueFormatter: (p) => Format.percentFixed(p),
        },
      ]}
      xAxis={[
        {
          scaleType: 'band',
          dataKey: 'lead',
          label:
            Translate('Leading digit of votes received by parties') +
            ` (n=${totalN})`,
        },
      ]}
      series={[{ dataKey: 'p', valueFormatter: (p) => Format.percentFixed(p) }]}
      width={600}
      height={400}
      grid={{ vertical: true, horizontal: true }}
    />
  );
}

export default function BanfordView() {
  return (
    <Stack direction="column" sx={{ alignItems: 'center' }}>
      <CustomAlert>
        {Translate(
          "Benford's law is an observation that in many real-life sets of numerical data (including votes in elections), the leading digit is likely to be small. The number 1 appears as the leading significant digit about 30% of the time, while 9 appears as the leading significant digit less than 5% of the time.",
        )}
      </CustomAlert>
      <BanfordBarChart />
    </Stack>
  );
}

import { Stack } from '@mui/material';

import { Translate, Format } from '../../../nonview';

import { CustomAlert } from '../..';

import GenericScatterChart from './GenericScatterChart';

export default function EffectiveVotesView() {
  return (
    <Stack direction="column" sx={{ alignItems: 'center' }}>
      <CustomAlert>
        {Translate(
          'The ratio of total valid votes, in proportion to electors.',
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.pEffective}
        formatStat={Format.percentFixed}
        idPrefix="effective"
      />
    </Stack>
  );
}

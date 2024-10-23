import { Stack } from '@mui/material';

import { Translate, Format } from '../../../nonview';

import { CustomAlert } from '../..';

import GenericScatterChart from './GenericScatterChart';

export default function ElectorsView() {
  return (
    <Stack direction="column" sx={{ alignItems: 'center' }}>
      <CustomAlert>
        {Translate(
          'An abnormal change in the number of registered voters across elections could be suspicious.',
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.electors}
        formatStat={Format.intHumanize}
      />
    </Stack>
  );
}

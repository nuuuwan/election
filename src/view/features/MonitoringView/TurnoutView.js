import { Stack } from '@mui/material';

import { Translate, Format } from '../../../nonview';

import { CustomAlert } from '../..';

import GenericScatterChart from './GenericScatterChart';

export default function TurnoutView() {
  return (
    <Stack direction="column" sx={{ alignItems: 'center' }}>
      <CustomAlert>
        {Translate(
          'Abruptly high voter turnout in specific regions or polling stations, especially if the rates are highly inconsistent with historical trends, could be suspicious.',
        )}
      </CustomAlert>
      <GenericScatterChart
        getValue={(result) => result.summary.pTurnout}
        formatStat={Format.percentFixed}
        idPrefix="turnout"
      />
    </Stack>
  );
}

import { Link, Stack, Typography } from '@mui/material';
import { Format, Translate } from '../../nonview';

import CustomAlert from '../base/CustomAlert';

import { useDataContext } from '../../nonview/core/DataProvider';
import { useDataSlowContext } from '../../nonview/core/DataSlowProvider';

const ERROR_CONF = 0.9; // #HACK: Must be moved, once error is re-introduced!

export function ProjectionAlert() {
  const data = useDataContext();
  const { electionDisplay, entIdx } = data;

  const entID = 'LK';
  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, entIdx);

  const isComplete = nResultsReleased === nResultsTotal;

  if (isComplete) {
    return null;
  }

  return (
    <CustomAlert severity="warning">
      <Typography variant="body1">
        {Translate(
          'This projection is generated by a Machine Learning model using both current released results and historical data. The results have a %1 confidence level. These are not official results and could differ significantly from the final outcome. For more details, please refer to the ',
          [Format.percent(ERROR_CONF)],
        )}
        <Link href="https://github.com/nuuuwan/election">
          {Translate('Source Code')}
        </Link>
        {'.'}
      </Typography>
    </CustomAlert>
  );
}

export function ProjectionErrorAlert() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const { electionProjected, electionProjectedWithError } = data;

  if (!electionProjected) {
    return (
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate(
            'No historical data available to train the projection model.',
          )}
        </Typography>
      </CustomAlert>
    );
  }

  if (!electionProjectedWithError) {
    return (
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate(
            "With only one past election, estimating the model's error is not feasible.",
          )}
        </Typography>
      </CustomAlert>
    );
  }

  return null;
}

export default function ProjectionTitle() {
  const data = useDataContext();
  const { electionDisplay, pdIdx } = data;

  const entID = 'LK';
  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, pdIdx);

  const isComplete = nResultsReleased === nResultsTotal;

  let title = 'Final Result';
  if (!isComplete) {
    title = 'Projected Final Result';
  }

  return (
    <Typography variant="h4" color="secondary">
      <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
        {Translate(title)}
      </Stack>
    </Typography>
  );
}
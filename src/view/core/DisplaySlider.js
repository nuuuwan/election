import { Slider, Stack, Typography } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';
import { useState } from 'react';
import { useBasePageHandlerContext } from '../pages/BasePage/BasePageHandlerProvider';

export default function DisplaySlider() {
  const data = useDataContext();
  const handlers = useBasePageHandlerContext();
  const { nResultsDisplay, election } = data;

  const { setNResultsDisplay } = handlers;
  const [valueDisplay, setValueDisplay] = useState(nResultsDisplay);
  const nResults = election.nResults;
  const onChange = function (event, value) {
    setValueDisplay(value);
  };

  const onChangeCommitted = function (event, value) {
    setValueDisplay(value);
    setNResultsDisplay(value);
  };

  return (
    <Stack direction="row" gap={2} alignItems="center">
      <Slider
        value={valueDisplay}
        min={0}
        max={nResults}
        onChange={onChange}
        onChangeCommitted={onChangeCommitted}
      />
      <Stack direction="row" gap={0} alignItems="center">
        <Typography variant="h5">{valueDisplay || nResultsDisplay}</Typography>
        <Typography variant="body1" sx={{ color: '#888' }}>
          {`/${nResults}`}
        </Typography>
      </Stack>
    </Stack>
  );
}

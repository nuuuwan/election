import { Box, Typography } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';

export default function ClockView() {
  const data = useDataContext();
  const { electionDisplay } = data;
  const lastResult = electionDisplay.lastResult;
  if (!lastResult || !lastResult.resultTime) {
    return null;
  }
  return (
    <Box>
      <Typography variant="h5">
        {lastResult.resultTime.substring(0, 19)}
      </Typography>
    </Box>
  );
}

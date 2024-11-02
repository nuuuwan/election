import { Typography } from '@mui/material';
import { useDataContext } from '../../nonview/core/DataProvider';

export default function ElectionSmallTitle() {
  const data = useDataContext();
  const { electionDisplay } = data;
  return (
    <Typography variant="h6" sx={{ opacity: 0.1 }}>
      {electionDisplay.hashtag}
    </Typography>
  );
}

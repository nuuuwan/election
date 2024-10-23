import { Stack, Typography } from '@mui/material';
import { Translate } from '../../../nonview';
import ProjectedResultDetailsView from './ProjectedResultDetailsView';

export default function ModelDetailsView() {
  return (
    <Stack direction="column" alignItems="center">
      <Typography variant="h4">{Translate('Model Details')}</Typography>
      <ProjectedResultDetailsView />
    </Stack>
  );
}

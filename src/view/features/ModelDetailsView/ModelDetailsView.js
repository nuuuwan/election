import { Stack } from '@mui/material';

import ProjectedResultDetailsView from './ProjectedResultDetailsView';
import EvaluatePreviousElection from './EvaluatePreviousElection';

export default function ModelDetailsView() {
  return (
    <Stack direction="column" alignItems="center">
      <ProjectedResultDetailsView />
      <EvaluatePreviousElection />
    </Stack>
  );
}

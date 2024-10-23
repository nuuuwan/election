import ProjectedResultDetailsView from './ProjectedResultDetailsView';
import EvaluatePreviousElection from './EvaluatePreviousElection';
import { CustomLoadingProgress, TabSelector } from '../..';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { Typography } from '@mui/material';
import { ElectionModelError, Translate } from '../../../nonview';

export default function ModelDetailsView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay } = data;

  const notReleasedPDIDList = ElectionModelError.getNonReleasedPDIDList({
    electionProjected,
    electionDisplay,
  });

  if (notReleasedPDIDList.length === 0) {
    return (
      <Typography variant="h6">
        {Translate('Final Results have been Released.')}
      </Typography>
    );
  }

  return (
    <TabSelector
      valueIdx={{
        'Projected Result Details': <ProjectedResultDetailsView />,
        'Evaluate Previous Election': <EvaluatePreviousElection />,
      }}
    />
  );
}

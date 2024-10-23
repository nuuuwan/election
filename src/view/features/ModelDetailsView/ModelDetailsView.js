import ProjectedResultDetailsView from './ProjectedResultDetailsView';
import EvaluatePreviousElection from './EvaluatePreviousElection';
import { CustomAlert, CustomLoadingProgress, TabSelector } from '../..';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { Typography } from '@mui/material';
import { ElectionModelError, Translate } from '../../../nonview';

export default function ModelDetailsView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay } = data;
  if (!electionProjected) {
    return (
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate('No data to train projection model.')}
        </Typography>
      </CustomAlert>
    );
  }

  const notReleasedPDIDList = ElectionModelError.getNonReleasedPDIDList({
    electionProjected,
    electionDisplay,
  });
  if (notReleasedPDIDList.length === 0 || !electionProjected) {
    return (
      <CustomAlert severity="info">
        <Typography variant="body1">
          {Translate('All results have been released.')}
        </Typography>
      </CustomAlert>
    );
  }

  return (
    <TabSelector
      valueIdx={{
        'Evaluate Previous Election': <EvaluatePreviousElection />,
        'Projected Result Details': <ProjectedResultDetailsView />,
      }}
    />
  );
}

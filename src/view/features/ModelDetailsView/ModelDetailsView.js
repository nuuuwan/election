import ProjectedResultDetailsView from './ProjectedResultDetailsView';
import EvaluatePreviousElection from './EvaluatePreviousElection';
import { CustomAlert, CustomLoadingProgress, TabSelector } from '../..';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { Typography } from '@mui/material';
import { ElectionModelError, Translate } from '../../../nonview';
import { useBasePageHandlerContext } from '../../pages/BasePage/BasePageHandlerProvider';

function AlertNoData() {
  return (
    <CustomAlert severity="warning">
      <Typography variant="body1">
        {Translate('No data to train projection model.')}
      </Typography>
    </CustomAlert>
  );
}

function AlertAllResultsReleased() {
  return (
    <CustomAlert severity="info">
      <Typography variant="body1">
        {Translate('All results have been released.')}
      </Typography>
    </CustomAlert>
  );
}

export default function ModelDetailsView() {
  const data = useDataSlowContext();
  const handlers = useBasePageHandlerContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay, groupModelInsights } = data;
  if (!electionProjected) {
    return <AlertNoData />;
  }
  const notReleasedPDIDList = ElectionModelError.getNonReleasedPDIDList({
    electionProjected,
    electionDisplay,
  });
  if (notReleasedPDIDList.length === 0 || !electionProjected) {
    return <AlertAllResultsReleased />;
  }
  const { setGroupModelInsights } = handlers;
  return (
    <TabSelector
      valueIdx={{
        'Evaluate Previous Election': <EvaluatePreviousElection />,
        'Projected Result Details': <ProjectedResultDetailsView />,
      }}
      initSelectedValue={groupModelInsights}
      setGroup={setGroupModelInsights}
    />
  );
}

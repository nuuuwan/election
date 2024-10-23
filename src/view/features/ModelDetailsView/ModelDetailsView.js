import ProjectedResultDetailsView from './ProjectedResultDetailsView';
import EvaluatePreviousElection from './EvaluatePreviousElection';
import { TabSelector } from '../..';

export default function ModelDetailsView() {
  return (
    <TabSelector
      valueIdx={{
        'Projected Result Details': <ProjectedResultDetailsView />,
        'Evaluate Previous Election': <EvaluatePreviousElection />,
      }}
    />
  );
}

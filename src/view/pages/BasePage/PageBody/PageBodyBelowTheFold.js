import {
  AggregatedResultView,
  MonitoringView,
  DisclaimerView,
  ModelDetailsView,
  TabSelector,
} from '../../../';
import { useDataContext } from '../../../../nonview/core/DataProvider';
import { useBasePageHandlerContext } from '../BasePageHandlerProvider';

export default function PageBodyBelowTheFold() {
  const data = useDataContext();
  const handlers = useBasePageHandlerContext();

  const { groupBelowTheFold } = data;
  const { setGroupBelowTheFold } = handlers;

  return (
    <TabSelector
      valueIdx={{
        Aggregated_Results: () => <AggregatedResultView />,
        Monitoring: () => <MonitoringView />,
        Model_Insights: () => <ModelDetailsView />,
        Disclaimers: () => <DisclaimerView />,
      }}
      initSelectedValue={groupBelowTheFold}
      setGroup={setGroupBelowTheFold}
    />
  );
}

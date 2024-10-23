import {
  AggregatedResultView,
  MonitoringView,
  DisclaimerView,
  ModelDetailsView,
  TabSelector,
} from '../../../';

export default function PageBodyBelowTheFold() {
  return (
    <TabSelector
      valueIdx={{
        'model insights': <ModelDetailsView />,
        'aggregated results': <AggregatedResultView />,
        monitoring: <MonitoringView />,
        disclaimers: <DisclaimerView />,
      }}
    />
  );
}

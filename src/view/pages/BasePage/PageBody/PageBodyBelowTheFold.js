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
        'aggregated results': <AggregatedResultView />,
        'model insights': <ModelDetailsView />,
        monitoring: <MonitoringView />,
        disclaimers: <DisclaimerView />,
      }}
    />
  );
}

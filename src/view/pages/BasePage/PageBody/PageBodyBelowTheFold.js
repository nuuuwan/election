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
        monitoring: <MonitoringView />,
        'model insights': <ModelDetailsView />,

        disclaimers: <DisclaimerView />,
      }}
    />
  );
}

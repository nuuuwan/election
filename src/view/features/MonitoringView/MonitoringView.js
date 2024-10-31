import BanfordView from './BanfordView';
import TurnoutView from './TurnoutView';
import RejectedView from './RejectedView';
import ElectorsView from './ElectorsView';
import { TabSelector } from '../..';
import { useDataContext } from '../../../nonview/core/DataProvider';

export default function MonitoringView() {
  const data = useDataContext();
  const { groupMonitoring } = data;
  return (
    <TabSelector
      valueIdx={{
        Banford: <BanfordView />,
        Turnout: <TurnoutView />,
        Rejected: <RejectedView />,
        Electors: <ElectorsView />,
      }}
      initSelectedValue={groupMonitoring}
    />
  );
}

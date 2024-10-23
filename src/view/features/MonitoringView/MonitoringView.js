import BanfordView from './BanfordView';
import TurnoutView from './TurnoutView';
import RejectedView from './RejectedView';
import ElectorsView from './ElectorsView';
import { TabSelector } from '../..';

export default function MonitoringView() {
  return (
    <TabSelector
      valueIdx={{
        Banford: <BanfordView />,
        Turnout: <TurnoutView />,
        Rejected: <RejectedView />,
        Electors: <ElectorsView />,
      }}
    />
  );
}

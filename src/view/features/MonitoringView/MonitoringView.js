import BanfordView from './BanfordView';
import TurnoutView from './TurnoutView';
import RejectedView from './RejectedView';
import ElectorsView from './ElectorsView';
import { TabSelector } from '../..';
import { useDataContext } from '../../../nonview/core/DataProvider';
import { useBasePageHandlerContext } from '../../pages/BasePage/BasePageHandlerProvider';

export default function MonitoringView() {
  const data = useDataContext();
  const handlers = useBasePageHandlerContext();

  const { groupMonitoring } = data;
  const { setGroupMonitoring } = handlers;
  return (
    <TabSelector
      valueIdx={{
        Banford: <BanfordView />,
        Turnout: <TurnoutView />,
        Rejected: <RejectedView />,
        Electors: <ElectorsView />,
      }}
      initSelectedValue={groupMonitoring}
      setGroup={setGroupMonitoring}
    />
  );
}

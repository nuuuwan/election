import { TabSelector, WaterMark } from '../..';

import AggregatedResultUtils from './AggregatedResultUtils';
import AggregatedResultViewGroup from './AggregatedResultViewGroup';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { useBasePageHandlerContext } from '../../pages/BasePage/BasePageHandlerProvider';

export default function AggregatedResultView() {
  const data = useDataSlowContext();
  const handlers = useBasePageHandlerContext();
  if (!data) {
    return null;
  }
  const groupToEntIDListGetter =
    AggregatedResultUtils.getGroupToEntIDListGetter(data);

  const { groupAggregatedResults } = data;
  const { setGroupAggregatedResults } = handlers;

  const valueIdx = Object.fromEntries(
    Object.entries(groupToEntIDListGetter).map(function ([
      group,
      entIDListGetter,
    ]) {
      return [
        group,
        <WaterMark
          key={group}
          id={'aggregate-result-table-' + group.toLowerCase()}
        >
          <AggregatedResultViewGroup entIDList={entIDListGetter(data)} />
        </WaterMark>,
      ];
    }),
  );

  return (
    <TabSelector
      valueIdx={valueIdx}
      initSelectedValue={groupAggregatedResults}
      setGroup={setGroupAggregatedResults}
    />
  );
}

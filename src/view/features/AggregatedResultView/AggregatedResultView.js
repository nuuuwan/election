import { TabSelector, ExternalMedia } from '../..';

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
        <ExternalMedia
          key={group}
          id={'aggregated-results-table-' + group.toLowerCase()}
        >
          <AggregatedResultViewGroup entIDList={entIDListGetter(data)} />
        </ExternalMedia>,
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

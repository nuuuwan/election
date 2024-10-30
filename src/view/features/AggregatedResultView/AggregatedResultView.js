import { TabSelector, WaterMark } from '../..';

import AggregatedResultUtils from './AggregatedResultUtils';
import AggregatedResultViewGroup from './AggregatedResultViewGroup';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';

export default function AggregatedResultView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }
  const groupToEntIDListGetter =
    AggregatedResultUtils.getGroupToEntIDListGetter(data);

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

  return <TabSelector valueIdx={valueIdx} />;
}

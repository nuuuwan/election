import { TabSelector } from '../..';

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
        <AggregatedResultViewGroup
          key={group}
          entIDList={entIDListGetter(data)}
        />,
      ];
    }),
  );

  return <TabSelector valueIdx={valueIdx} />;
}

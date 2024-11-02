import { TabSelector, ExternalMedia, ExternalMediaCustomData } from '../..';

import AggregatedResultUtils from './AggregatedResultUtils';
import AggregatedResultViewGroup from './AggregatedResultViewGroup';
import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import { useBasePageHandlerContext } from '../../pages/BasePage/BasePageHandlerProvider';

function getValueIdx({
  groupToEntIDListGetter,
  data,
  nResultsReleased,
  nResultsTotal,
}) {
  return Object.fromEntries(
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
          <ExternalMediaCustomData
            customData={{ group, nResultsReleased, nResultsTotal }}
          />
          <AggregatedResultViewGroup
            group={group}
            nResultsReleased={nResultsReleased}
            nResultsTotal={nResultsTotal}
            entIDList={entIDListGetter(data)}
          />
        </ExternalMedia>,
      ];
    }),
  );
}

export default function AggregatedResultView() {
  const data = useDataSlowContext();
  const handlers = useBasePageHandlerContext();
  if (!data) {
    return null;
  }
  const groupToEntIDListGetter =
    AggregatedResultUtils.getGroupToEntIDListGetter(data);

  const { groupAggregatedResults, electionDisplay, pdIdx } = data;
  const { setGroupAggregatedResults } = handlers;

  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal('LK', pdIdx);

  return (
    <TabSelector
      valueIdx={getValueIdx({
        groupToEntIDListGetter,
        data,
        nResultsReleased,
        nResultsTotal,
      })}
      initSelectedValue={groupAggregatedResults}
      setGroup={setGroupAggregatedResults}
    />
  );
}

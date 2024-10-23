import { useDataSlowContext } from '../../../nonview/core/DataSlowProvider';
import CustomLoadingProgress from '../../base/CustomLoadingProgress';
import AggregatedResultViewGroup from '../AggregatedResultView/AggregatedResultViewGroup';

export default function ProjectedResultDetailsView() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionProjected, electionDisplay } = data;
  const releasedPDIDList = electionDisplay.baseEntIDList;
  const notReleasedPDIDList = electionProjected.baseEntIDList.filter(
    (pdID) => !releasedPDIDList.includes(pdID),
  );
  return (
    <AggregatedResultViewGroup
      entIDList={notReleasedPDIDList}
      customElection={electionProjected}
    />
  );
}

import HistoryAlert from '../../../core/HistoryAlert';
import ResultsReleasedTitlePercent from '../../../core/ResultsReleasedTitlePercent';

import LatestResultListView from '../../../features/LatestResultListView';

export default function PageBodyLeft() {
  return (
    <>
      <ResultsReleasedTitlePercent />
      <LatestResultListView />
      <HistoryAlert />
    </>
  );
}

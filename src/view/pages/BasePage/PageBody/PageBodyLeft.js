import HistoryAlert from "../../../core/HistoryAlert";
import ResultsReleasedTitlePercent from "../../../core/ResultsReleasedTitlePercent";
import BellwetherView from "../../../features/BellwetherView";
import LatestResultListView from "../../../features/LatestResultListView";


export default function PageBodyLeft() {
  return (
    <>
      <ResultsReleasedTitlePercent />
      <LatestResultListView />
      <BellwetherView />
      <HistoryAlert />
    </>
  );
}

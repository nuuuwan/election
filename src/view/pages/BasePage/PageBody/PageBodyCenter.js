import ElectionSmallTitle from "../../../core/ElectionSmallTitle";
import HexagonClickAlert from "../../../core/HexagonClickAlert";
import ResultsReleasedTitleNumber from "../../../core/ResultsReleasedTitleNumber";
import HexMapView from "../../../features/HexMapView/HexMapView";


export default function PageBodyCenter() {
  return (
    <>
      <ResultsReleasedTitleNumber />
      <HexMapView />
      <ElectionSmallTitle />
      <HexagonClickAlert />
    </>
  );
}

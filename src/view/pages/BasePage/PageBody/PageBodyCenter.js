import { WaterMark } from '../../..';
import HexagonClickAlert from '../../../core/HexagonClickAlert';
import ResultsReleasedTitleNumber from '../../../core/ResultsReleasedTitleNumber';
import HexMapView from '../../../features/HexMapView/HexMapView';

export default function PageBodyCenter() {
  return (
    <>
      <WaterMark id="hexmap">
        <ResultsReleasedTitleNumber />
        <HexMapView />
      </WaterMark>

      <HexagonClickAlert />
    </>
  );
}

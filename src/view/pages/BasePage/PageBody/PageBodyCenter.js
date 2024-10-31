import { ExternalMedia } from '../../..';
import HexagonClickAlert from '../../../core/HexagonClickAlert';
import ResultsReleasedTitleNumber from '../../../core/ResultsReleasedTitleNumber';
import HexMapView from '../../../features/HexMapView/HexMapView';

export default function PageBodyCenter() {
  return (
    <>
      <ExternalMedia id="hexmap">
        <ResultsReleasedTitleNumber />
        <HexMapView />
      </ExternalMedia>

      <HexagonClickAlert />
    </>
  );
}

import { ExternalMedia, PartyToWinsView } from '../../..';

import { useDataContext } from '../../../../nonview/core/DataProvider';
import HexagonClickAlert from '../../../core/HexagonClickAlert';
import ResultsReleasedTitleNumber from '../../../core/ResultsReleasedTitleNumber';
import HexMapView from '../../../features/HexMapView/HexMapView';

export default function PageBodyCenter() {
  const data = useDataContext();
  return (
    <>
      <ExternalMedia id="hexmap">
        <ResultsReleasedTitleNumber />
        <HexMapView />
        <PartyToWinsView />
      </ExternalMedia>

      <HexagonClickAlert />
    </>
  );
}

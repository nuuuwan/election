import { ExternalMedia, PartyToWinsView } from '../../..';
import { useDataContext } from '../../../../nonview/core/DataProvider';
import HexagonClickAlert from '../../../core/HexagonClickAlert';
import ResultsReleasedTitleNumber from '../../../core/ResultsReleasedTitleNumber';
import HexMapView from '../../../features/HexMapView/HexMapView';

function getTextLines({ data }) {
  const { electionDisplay, pdIdx } = data;

  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal('LK', pdIdx);

  return [
    `#HexMap of All Results`,
    `${nResultsReleased} of ${nResultsTotal} Results Released`,
  ];
}

export default function PageBodyCenter() {
  const data = useDataContext();
  return (
    <>
      <ExternalMedia id="hexmap" textLines={getTextLines({ data })}>
        <ResultsReleasedTitleNumber />
        <HexMapView />
        <PartyToWinsView />
      </ExternalMedia>

      <HexagonClickAlert />
    </>
  );
}

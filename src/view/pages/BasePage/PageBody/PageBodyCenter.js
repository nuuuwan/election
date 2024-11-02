import { ExternalMedia, PartyToWinsView } from '../../..';

import { useDataContext } from '../../../../nonview/core/DataProvider';
import HexagonClickAlert from '../../../core/HexagonClickAlert';
import ResultsReleasedTitleNumber from '../../../core/ResultsReleasedTitleNumber';
import HexMapView from '../../../features/HexMapView/HexMapView';

function getCustomData({ data }) {
  const { electionDisplay, pdIdx } = data;

  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal('LK', pdIdx);

  return {
    nResultsReleased,
    nResultsTotal,
    partyToWins: electionDisplay.partyToWins,
  };
}

export default function PageBodyCenter() {
  const data = useDataContext();
  return (
    <>
      <ExternalMedia id="hexmap" customData={getCustomData({ data })}>
        <ResultsReleasedTitleNumber />
        <HexMapView />
        <PartyToWinsView />
      </ExternalMedia>

      <HexagonClickAlert />
    </>
  );
}

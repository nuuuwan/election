import { ExternalMedia, PartyToWinsView } from '../../..';
import { Party } from '../../../../nonview';
import { useDataContext } from '../../../../nonview/core/DataProvider';
import HexagonClickAlert from '../../../core/HexagonClickAlert';
import ResultsReleasedTitleNumber from '../../../core/ResultsReleasedTitleNumber';
import HexMapView from '../../../features/HexMapView/HexMapView';

function getTextLines({ data }) {
  const { electionDisplay, pdIdx } = data;

  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal('LK', pdIdx);

  let lines = [
    `#HexMap of All Results`,
    `${nResultsReleased} of ${nResultsTotal} Results Released`,
    '',
  ];
  for (const [partyID, wins] of Object.entries(electionDisplay.partyToWins)) {
    const party = Party.fromID(partyID);
    lines.push(`${party.emoji} ${wins} ${party.xTag}`);
  }
  return lines;
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

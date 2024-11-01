import CustomStack from '../../../core/CustomStack';

import { useDataSlowContext } from '../../../../nonview/core/DataSlowProvider';

import { Format, Party } from '../../../../nonview';
import ProjectionTitle, {
  ProjectionAlert,
  ProjectionErrorAlert,
} from '../../../core/ProjectionTitle';
import ProjectionViewParliamentary from '../../../features/ProjectionView/ProjectionViewParliamentary';
import ProjectionViewPresidential from '../../../features/ProjectionView/ProjectionViewPresidential';
import {
  CustomLoadingProgress,
  ProjectionModelInfoView,
  ExternalMedia,
} from '../../..';

function PageBodyRightTypeSpecific() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionDisplay } = data;
  if (electionDisplay.isPresidential) {
    return <ProjectionViewPresidential />;
  }
  return <ProjectionViewParliamentary />;
}

function getTextLinesForResult({ election }) {
  const partyToVoteErrorInfo = election.getLKPartyToVotesErrorInfo();
  const totalVotes = election.summary.valid;
  let lines = [''];
  for (const [partyID, { votesMin, votesMax }] of Object.entries(
    partyToVoteErrorInfo,
  )) {
    const party = Party.fromID(partyID);
    const pVotesMin = votesMin / totalVotes;
    const pVotesMax = votesMax / totalVotes;
    lines.push(
      `${party.emoji} ${Format.percentRange(pVotesMin, pVotesMax)} ${
        party.xTag
      }`,
    );
  }
  return lines;
}

function getTextLines({ data }) {
  const {
    electionDisplay,
    electionProjected,
    electionProjectedWithError,
    pdIdx,
  } = data;

  const entID = 'LK';
  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, pdIdx);
  const nToGo = nResultsTotal - nResultsReleased;
  const isComplete = nToGo === 0;
  const election =
    electionProjectedWithError || electionProjected || electionDisplay;

  return [].concat(
    isComplete
      ? ['🏁 Final Result']
      : ['🤖 Projected Final Result', `${nToGo} results left`],
    getTextLinesForResult({ election }),
  );
}

export default function PageBodyRight() {
  const data = useDataSlowContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  return (
    <CustomStack>
      <ProjectionModelInfoView>
        <ExternalMedia
          id="projection-details"
          textLines={getTextLines({ data })}
        >
          <ProjectionTitle />
          <PageBodyRightTypeSpecific />
        </ExternalMedia>
        <ProjectionErrorAlert />
        <ProjectionAlert />
      </ProjectionModelInfoView>
    </CustomStack>
  );
}

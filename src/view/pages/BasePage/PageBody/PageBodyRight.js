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

function getTextLinesForResult({ resultLK }) {
  const partyToPVotesSortedOthered =
    resultLK.partyToVotes.partyToPVotesSortedOthered;
  let lines = [''];
  const pVotesError = resultLK.partyToVotes.partyToPVotes[Party.ERROR.id] || 0;

  for (const [partyID, pVotes] of Object.entries(partyToPVotesSortedOthered)) {
    const party = Party.fromID(partyID);
    lines.push(
      `${party.emoji} ${Format.percentRange(pVotes, pVotes + pVotesError)} ${
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
  const resultLK = election.resultLK;

  console.debug(resultLK.partyToVotes.partyToVotes[Party.ERROR.id]);

  return [].concat(
    isComplete
      ? ['🏁 Final Result']
      : ['🤖 Projected Final Result', `${nToGo} results left`],
    getTextLinesForResult({ resultLK }),
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

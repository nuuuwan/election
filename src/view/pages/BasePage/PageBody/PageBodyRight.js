import CustomStack from '../../../core/CustomStack';

import { useDataSlowContext } from '../../../../nonview/core/DataSlowProvider';

import { Seats } from '../../../../nonview';
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

function getCustomDataForParliamentary({ election }) {
  const seats = Seats.fromElection(election);

  return {
    partyToSeats: seats.getTotalPartyToSeats(),
  };
}
function getCustomDataForPresidential({ election }) {
  const partyToVotesErrorInfo = election.getLKPartyToVotesErrorInfo();
  const totalVotes = election.summary.valid;
  return {
    partyToVotesErrorInfo,
    totalVotes,
  };
}

function getCustomDataForElection({ election }) {
  if (election.isPresidential) {
    return getCustomDataForPresidential({ election });
  }
  return getCustomDataForParliamentary({ election });
}

function getCustomData({ data }) {
  const {
    electionDisplay,
    electionProjectedWithError,
    electionProjected,
    pdIdx,
  } = data;

  const entID = 'LK';
  const { nResultsTotal, nResultsReleased } =
    electionDisplay.getNResultsReleasedAndTotal(entID, pdIdx);
  const election =
    electionProjectedWithError || electionProjected || electionDisplay;

  return Object.assign(
    {
      nResultsReleased,
      nResultsTotal,
    },
    getCustomDataForElection({ election }),
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
          customData={getCustomData({ data })}
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

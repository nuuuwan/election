import CustomStack from '../../../core/CustomStack';

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
import { useDataSlowContext } from '../../../../nonview/core/DataSlowProvider';

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

export default function PageBodyRight() {
  return (
    <CustomStack>
      <ProjectionModelInfoView>
        <ExternalMedia id="projection-details">
          <ProjectionTitle />
          <PageBodyRightTypeSpecific />
        </ExternalMedia>
        <ProjectionErrorAlert />
        <ProjectionAlert />
      </ProjectionModelInfoView>
    </CustomStack>
  );
}

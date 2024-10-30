import { useDataContext } from '../../../../nonview/core/DataProvider';

import CustomStack from '../../../core/CustomStack';

import ProjectionTitle, {
  ProjectionAlert,
  ProjectionErrorAlert,
} from '../../../core/ProjectionTitle';
import ProjectionViewParliamentary from '../../../features/ProjectionView/ProjectionViewParliamentary';
import ProjectionViewPresidential from '../../../features/ProjectionView/ProjectionViewPresidential';
import { ProjectionModelInfoView } from '../../..';

function PageBodyRightTypeSpecific() {
  const data = useDataContext();
  const { electionDisplay } = data;
  if (electionDisplay.isPresidential) {
    return <ProjectionViewPresidential />;
  }
  return <ProjectionViewParliamentary />;
}

export default function PageBodyRight() {
  return (
    <CustomStack>
      <ProjectionTitle />
      <ProjectionModelInfoView>
        <PageBodyRightTypeSpecific />

        <ProjectionErrorAlert />
        <ProjectionAlert />
      </ProjectionModelInfoView>
    </CustomStack>
  );
}

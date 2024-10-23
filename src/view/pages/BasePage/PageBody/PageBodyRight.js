import { useDataContext } from '../../../../nonview/core/DataProvider';

import CustomStack from '../../../core/CustomStack';
import ElectionSmallTitle from '../../../core/ElectionSmallTitle';
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
        <ElectionSmallTitle />
        <ProjectionErrorAlert />
        <ProjectionAlert />
      </ProjectionModelInfoView>
    </CustomStack>
  );
}

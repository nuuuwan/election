import { useDataContext } from "../../../../nonview/core/DataProvider";
import CustomStack from "../../../core/CustomStack";
import ProjectionTitle from "../../../core/ProjectionTitle";
import ProjectionViewParliamentary from "../../../features/ProjectionView/ProjectionViewParliamentary";
import ProjectionViewPresidential from "../../../features/ProjectionView/ProjectionViewPresidential";


function PageBodyRightForType() {
  const data = useDataContext();
  const { electionDisplay } = data;
  if (electionDisplay.isPresidential) {
    return <ProjectionViewPresidential />;
  }
  return <ProjectionViewParliamentary />;
}

function PageBodyRightCommon() {
  return (
    <ProjectionTitle />
  );
}

export default function PageBodyRight() {
  return (
    <CustomStack>
      <PageBodyRightCommon />
      <PageBodyRightForType />
    </CustomStack>
  );
}

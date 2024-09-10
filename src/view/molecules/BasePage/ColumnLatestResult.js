
import { useDataContext } from "../../../nonview/core/DataProvider";
import { LatestResultTitle } from "../../../view/atoms";
import { ResultSingleView, PDSelector, BellwetherView } from "../../../view/molecules";
import CustomStack from "./CustomStack";

export default function ColumnLatestResult() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const activePDID = electionDisplay.finalPDID;

  return (
    <CustomStack>
      <LatestResultTitle />
      <PDSelector activePDID={activePDID} />
      <ResultSingleView entID={activePDID} />
      <BellwetherView />
    </CustomStack>
  );
}

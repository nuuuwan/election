import { ResultSingleView } from "..";
import CustomStack from "./CustomStack";
import { CumResultsTitle } from "../../atoms";
export default function ColumnCumulativeResult() {
  return (
    <CustomStack>
      <CumResultsTitle />
      <ResultSingleView entID={"LK"} />
    </CustomStack>
  );
}

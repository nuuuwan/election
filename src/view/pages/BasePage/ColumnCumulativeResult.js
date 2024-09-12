import { ResultSingleView } from "..";

import { CumResultsTitle, CustomStack } from "../../atoms";
export default function ColumnCumulativeResult() {
  return (
    <CustomStack>
      <CumResultsTitle />
      <ResultSingleView entID={"LK"} />
    </CustomStack>
  );
}

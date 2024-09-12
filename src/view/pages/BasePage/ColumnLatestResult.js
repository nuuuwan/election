import { Grid } from "@mui/material";
import { ProvinceUtils } from "../../../nonview/base";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { LatestResultTitle, PDSelector } from "../../../view/atoms";
import { BellwetherView, CumResultsView } from "../../../view/molecules";

import CustomStack from "./CustomStack";

export default function ColumnLatestResult() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;
  const activePDID = electionDisplay.finalPDID;
  const activeEDID = activePDID.substring(0, 5);
  const activeProvinceID = ProvinceUtils.getProvinceIDForEDID(activeEDID);

  const entIDs = [activePDID, activeEDID, activeProvinceID, "LK"];

  return (
    <CustomStack>
      <LatestResultTitle />
      <PDSelector activePDID={activePDID} />

      <Grid container>
        {entIDs.map(function (entID) {
          return (
            <Grid item xs={12} md={6} xl={6} key={entID}>
              <CumResultsView entID={entID} />
            </Grid>
          );
        })}
      </Grid>

      <BellwetherView />
    </CustomStack>
  );
}

import { Typography } from "@mui/material";
import { Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";

export default function LatestResultTitle() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const activePDID = electionDisplay.finalPDID;
  const color = electionDisplay.getResult(activePDID).winningPartyColor;

  return (

      <Typography variant="body1" color={color}>
        {Translate("Latest Result")} ({electionDisplay.nResults})
      </Typography>

  );
}

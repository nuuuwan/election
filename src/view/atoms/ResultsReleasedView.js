import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Translate } from "../../nonview/base";

export default function ResultsReleasedView({ entID }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx } = data;

  const { nResultsTotal, nResultsReleased } = electionDisplay.getReleaseStats(
    entID,
    pdIdx
  );
  if (nResultsTotal <= 1) {
    return null;
  }
  

    const title = <Stack direction="row" sx={{alignItems: "center"}}><Typography variant="h6">{nResultsReleased}</Typography><Typography variant="caption">/{nResultsTotal}</Typography></Stack>;
  
    const subTitle  =  nResultsReleased === nResultsTotal ? <CheckCircleIcon/> : null;
  


  return (
    <Stack direction="column" sx={{alignItems: "center"}}>
      <Typography variant="body1" color={"secondary"}>
      {title}
    </Typography>
    <Typography variant="caption" >
      {subTitle}
    </Typography>
    </Stack>
  );
}

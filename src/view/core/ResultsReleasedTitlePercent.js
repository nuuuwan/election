import { Box, Typography } from "@mui/material";
import {  Format, Translate } from "../../nonview";
import { useDataSlowContext } from "../../nonview/core/DataSlowProvider";
import CustomLoadingProgress from "../base/CustomLoadingProgress";



export  default function ResultsReleasedTitlePercent() {
  const data = useDataSlowContext();
  let title = <CustomLoadingProgress />;
  if (data) {
    const { electionDisplay, electionPrevious } = data;
    const entIdx = electionDisplay.getEntIdx(data);
    const entID = "LK";
    const pElectors = electionDisplay.getPElectors(entID, entIdx, electionPrevious);
    title = Format.percent(pElectors);
  } 
  return (
    <Box sx={{ marginBottom: 2 }}>
      <Typography variant="h4" color="gray">
        <span style={{ color: "black" }}>{title}</span>{" "}
        {Translate("Released")}
      </Typography>
    </Box>
  );
}
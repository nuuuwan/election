import { Typography } from "@mui/material";
import { Translate } from "../../../nonview/base";
import {
  ResultSingleView,
  PDSelector,
  BellwetherView,
} from "../../../view/molecules";
import CustomStack from "./CustomStack";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

export default function ColumnLatestResult({ setActivePDID }) {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const activePDID = electionDisplay.finalPDID;
  const color = electionDisplay.getResult(activePDID).winningPartyColor;

  return (
    <CustomStack>
      <Typography variant="body1" color={color}>
        {Translate("Latest Result")} ({electionDisplay.nResults})
      </Typography>
      <PDSelector activePDID={activePDID} setActivePDID={setActivePDID} />
      <ResultSingleView entID={activePDID} />
      <BellwetherView />
    </CustomStack>
  );
}

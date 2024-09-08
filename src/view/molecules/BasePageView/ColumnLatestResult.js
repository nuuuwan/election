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

export default function ColumnLatestResult({
  election,
  electionDisplay,

  setActivePDID,
}) {
  const activePDID = electionDisplay.finalPDID;
  const color = electionDisplay.getResult(activePDID).winningPartyColor;

  const db = useContext(DataContext);
  if (!db) {
    return null;
  }

  return (
    <CustomStack>
      <Typography variant="body1" color={color}>
        {Translate("Latest Result")} ({electionDisplay.nResults})
      </Typography>
      <PDSelector
        election={election}
        activePDID={activePDID}
        db={db}
        setActivePDID={setActivePDID}
      />
      <ResultSingleView
        election={electionDisplay}
        elections={db.elections}
        entID={activePDID}
      />
      <BellwetherView
        elections={db.elections}
        electionDisplay={electionDisplay}
        db={db}
      />
    </CustomStack>
  );
}

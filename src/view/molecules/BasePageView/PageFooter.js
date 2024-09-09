import { Box } from "@mui/material";
import { CitationsView, PlayerControl } from "../../../view/molecules";
import { STYLE } from "../../../nonview/constants";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

const STYLE_FOOTER = {
  BOX: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2000,
    backgroundColor: STYLE.COLOR.LIGHTEST,
    padding: 1,
  },
};

export default function PageFooter({
  setNResultsDisplay,
  noScroll,
}) {

  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { nResultsDisplay } = data;


  return (
    <Box sx={STYLE_FOOTER.BOX}>
      <CitationsView />
      {noScroll ? null : (
        <PlayerControl
          key={nResultsDisplay}
          nResultsDisplay={nResultsDisplay}
          setNResultsDisplay={setNResultsDisplay}
        />
      )}
    </Box>
  );
}

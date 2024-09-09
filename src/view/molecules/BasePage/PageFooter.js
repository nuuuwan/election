import { Box } from "@mui/material";

import { useDataContext } from "../../../nonview/core/DataProvider";
import { CitationsView, PlayerControl } from "..";

const STYLE_FOOTER = {
  BOX: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 2000,
    backgroundColor: "white",
    padding: 1,
  },
};

export default function PageFooter() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { nResultsDisplay, noScroll } = data;

  return (
    <Box sx={STYLE_FOOTER.BOX}>
      <CitationsView />
      {noScroll ? null : (
        <PlayerControl
          key={nResultsDisplay}
          nResultsDisplay={nResultsDisplay}
        />
      )}
    </Box>
  );
}

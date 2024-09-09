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
    backgroundColor: "secondary",
    padding: 1,
  },
};

export default function PageFooter({ setNResultsDisplay }) {
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
          setNResultsDisplay={setNResultsDisplay}
        />
      )}
    </Box>
  );
}

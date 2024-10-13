import { Box } from "@mui/material";

import { CitationsView, DisplaySlider } from "../../../view";
import { useDataContext } from "../../../nonview/core/DataProvider";

const STYLE_FOOTER = {
  BOX: {
    position: "fixed",
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 4000,
    backgroundColor: "white",
    padding: 2,
  },
};

export default function PageFooter() {
  const data = useDataContext();
  const {nResultsDisplay} = data;
  return (
    <Box sx={STYLE_FOOTER.BOX}>
      <DisplaySlider key={nResultsDisplay} />
      <CitationsView />
    </Box>
  );
}

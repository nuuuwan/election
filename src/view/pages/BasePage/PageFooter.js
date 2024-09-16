import { Box } from "@mui/material";

import { CitationsView } from "../../../view/atoms";

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
  return (
    <Box sx={STYLE_FOOTER.BOX}>
      <CitationsView />
    </Box>
  );
}

import { AppBar, Box, Toolbar } from "@mui/material";

import { useDataContext } from "../../../nonview/core/DataProvider";
import { EntView, ResultTimeView } from "../../../view/atoms";
import { CustomMenu } from "../../../view/molecules";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    padding: 0,
    margin: 0,
    color: "white",
    borderBottom: "1px solid #eee",
  },
};

export default function PageHeader() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionProjected, activePDID } = data;
  const backgroundColor = electionProjected?.color || "gray";

  return (
    <Box sx={Object.assign({ backgroundColor }, STYLE_PAGE_HEADER.SELECTOR)}>
      <AppBar position="static" sx={{ backgroundColor }}>
        <Toolbar>
          <EntView entID={activePDID} direction="row" />

          <Box sx={{ flexGrow: 1 }} />

          <ResultTimeView entID="LK" sx={{ color: "white" }} />

          <CustomMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

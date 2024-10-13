import { AppBar, Box, Toolbar, Typography } from "@mui/material";

import { RefreshButton, CustomMenu } from "../../../view";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";
import { Translate } from "../../../nonview";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "fixed",
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

function PageHeaderTitle() {
  const data = useDataSlowContext();
  let label = "Sri Lankan Elections";
  if (data) {
    const { electionProjected, nResultsDisplay } = data;
    if (electionProjected) {
      label = Translate(electionProjected.title) + ` (${nResultsDisplay})`;
    }
  }
  return <Typography variant="h4">{label}</Typography>;
}

export default function PageHeader() {
  const backgroundColor = "gray";
  return (
    <Box sx={Object.assign({ backgroundColor }, STYLE_PAGE_HEADER.SELECTOR)}>
      <AppBar position="static" sx={{ backgroundColor }}>
        <Toolbar>
          <PageHeaderTitle />
          <Box sx={{ flexGrow: 1 }} />
          <RefreshButton />
          <CustomMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

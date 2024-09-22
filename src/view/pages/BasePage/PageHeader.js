import { AppBar, Box, Toolbar,  } from "@mui/material";

import { useDataContext } from "../../../nonview/core/DataProvider";
import { EntView, ResultTimeView, RefreshButton } from "../../../view/atoms";
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
  const { electionProjected, activeEntID } = data;
  const backgroundColor = electionProjected?.color || "gray";

  return (
    <Box sx={Object.assign({ backgroundColor }, STYLE_PAGE_HEADER.SELECTOR)}>
      <AppBar position="static" sx={{ backgroundColor }}>
        <Toolbar>
          <EntView entID={activeEntID} direction="row" bigMode={true}/>
      
          <Box sx={{ flexGrow: 1 }} />

          <ResultTimeView entID="LK" sx={{ color: "white" }} hideBlank={true} bigMode={true} />

          <RefreshButton />
          <CustomMenu />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

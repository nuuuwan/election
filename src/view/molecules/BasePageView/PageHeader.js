import { Box, Typography } from "@mui/material";

import { STYLE } from "../../../nonview/constants";

import { ElectionSelector } from "../../molecules";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    backgroundColor: "white",
  },
  N_RESULTS_DISPLAY: {
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 3000,
    backgroundColor: "white",
    paddingTop: 1,
    paddingRight: 2,
    color: STYLE.COLOR.LIGHTER,
  },
};

export default function PageHeader({ electionDisplay, db, setElection }) {
  return (
    <Box>
      <Box sx={STYLE_PAGE_HEADER.SELECTOR}>
        <ElectionSelector
          selectedElection={electionDisplay}
          elections={db.elections}
          setElection={setElection}
        />
      </Box>
    </Box>
  );
}

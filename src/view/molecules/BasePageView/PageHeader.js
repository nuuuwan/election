import { Box } from "@mui/material";

import { ElectionSelector } from "../../molecules";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "fixed",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    padding: 1,
  },
};

export default function PageHeader({
  election,
  electionDisplay,
  db,
  setElection,
}) {
  const color = election.color;
  return (
    <Box
      sx={Object.assign({ backgroundColor: color }, STYLE_PAGE_HEADER.SELECTOR)}
    >
      <ElectionSelector
        selectedElection={electionDisplay}
        elections={db.elections}
        setElection={setElection}
      />
    </Box>
  );
}

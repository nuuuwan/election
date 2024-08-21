import { Box, Stack } from "@mui/material";

import { ElectionSelector, LanguageSelector } from "../../molecules";
import { STYLE } from "../../../nonview/constants";

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
  lang,
  electionDisplay,
  projectedElection,
  db,
  setLang,
  setElection,
}) {
  const color = projectedElection
    ? projectedElection.color
    : STYLE.COLOR.LIGHTEST;
    return (
    <Box
      sx={Object.assign({ backgroundColor: color }, STYLE_PAGE_HEADER.SELECTOR)}
    >
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="center"
      >
        <ElectionSelector
          selectedElection={electionDisplay}
          colorElection={projectedElection}
          elections={db.elections}
          setElection={setElection}
        />
        <LanguageSelector selectedLang={lang} setLang={setLang} />
      </Stack>
    </Box>
  );
}

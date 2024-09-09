import { Box, Stack } from "@mui/material";

import { ElectionSelector, LanguageSelector } from "../../molecules";
import { STYLE } from "../../../nonview/constants";
import { useContext } from "react";
import { DataContext } from "../../../nonview/core";

const STYLE_PAGE_HEADER = {
  SELECTOR: {
    position: "sticky",
    top: 0,
    right: 0,
    left: 0,
    zIndex: 3000,
    padding: 1,
    margin: 0,
  },
};

export default function PageHeader({

  setLang,
  setElection,
}) {
  const data = useContext(DataContext);
  if (!data) {
    return null;
  }
  const { projectedElection } = data;


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
          colorElection={projectedElection}
          setElection={setElection}
        />
        <LanguageSelector setLang={setLang} />
      </Stack>
    </Box>
  );
}

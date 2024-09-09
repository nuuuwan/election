import { Box, Stack } from "@mui/material";

import { ElectionSelector, LanguageSelector } from "..";

import { useDataContext } from "../../../nonview/core/DataProvider";

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

export default function PageHeader() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { projectedElection } = data;

  return (
    <Box sx={STYLE_PAGE_HEADER.SELECTOR}>
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
        justifyContent="center"
      >
        <ElectionSelector
          colorElection={projectedElection}

        />
        <LanguageSelector  />
      </Stack>
    </Box>
  );
}

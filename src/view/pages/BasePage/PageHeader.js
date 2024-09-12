import { Box, Stack } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { ElectionSelector, LanguageSelector } from "../../../view/atoms";

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

  const color = projectedElection ? projectedElection.color : "grey";

  return (
    <Box
      sx={Object.assign(STYLE_PAGE_HEADER.SELECTOR, {
        backgroundColor: color,
      })}
    >
      <Stack
        direction="row"
        gap={1}
        alignItems="center"
      >
        <ElectionSelector colorElection={projectedElection} />
        <LanguageSelector />
      </Stack>
    </Box>
  );
}

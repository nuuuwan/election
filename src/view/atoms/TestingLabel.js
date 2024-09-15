import { Box, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

const STYLE_TESTING_LABEL = {
  BOX: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    padding: "10%",
    margin: "auto",
  },
  LABEL: {
    fontSize: "1000%",
    opacity: 0.9,
    color: "black",
  },
};

export default function TestingLabel() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election } = data;
  if (!election.isFuture) {
    return null;
  }
  return (
    <Box sx={STYLE_TESTING_LABEL.BOX}>
      <Typography sx={STYLE_TESTING_LABEL.LABEL}>Test Data</Typography>
    </Box>
  );
}

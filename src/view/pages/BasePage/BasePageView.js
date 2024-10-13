import { Box } from "@mui/material";
import { HiddenDataView } from "../..";

import PageHeader from "./PageHeader";
import PageBody from "./PageBody/PageBody";
import PageFooter from "./PageFooter";

export default function BasePageView() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <HiddenDataView />
      <PageHeader />
      <PageBody />
      <PageFooter />
    </Box>
  );
}

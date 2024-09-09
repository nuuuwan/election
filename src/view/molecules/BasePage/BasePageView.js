import { Box } from "@mui/material";
import PageHeader from "./PageHeader";
import PageBody from "./PageBody";
import PageFooter from "./PageFooter";
import { TestingLabel } from "../../atoms";

export default function BasePageView() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <TestingLabel />
      <PageHeader  />
      <PageBody />
      <PageFooter  />
    </Box>
  );
}

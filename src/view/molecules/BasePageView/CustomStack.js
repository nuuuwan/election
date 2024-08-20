import { Stack } from "@mui/material";

export default function CustomStack({ children }) {
  return (
    <Stack direction="column" gap={1} sx={{ height: "90vh" }}>
      {children}
    </Stack>
  );
}

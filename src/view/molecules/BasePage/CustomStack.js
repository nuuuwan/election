import { Stack } from "@mui/material";

export default function CustomStack({ children }) {
  return (
    <Stack
      direction="column"
      alignItems="center"
      gap={1}
    >
      {children}
    </Stack>
  );
}

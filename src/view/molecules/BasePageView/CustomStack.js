import { Stack } from "@mui/material";

export default function CustomStack({ children }) {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      alignContent="center"
      gap={0.5}
    >
      {children}
    </Stack>
  );
}

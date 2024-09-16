import { Alert } from "@mui/material";

export default function CustomAlert({ children }) {
  return (
    <Alert
      severity="info"
      sx={{ marginTop: 1, textAlign: "justify", maxWidth: 320, margin: "auto" }}
    >
      {children}
    </Alert>
  );
}

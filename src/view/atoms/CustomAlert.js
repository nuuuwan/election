import { Alert } from "@mui/material";

export default function CustomAlert({ children }) {
  return (
    <Alert
      severity="info"
      sx={{ p: 2, textAlign: "justify", m: 3, marginTop: 6, borderRadius: 3 }}
    >
      {children}
    </Alert>
  );
}

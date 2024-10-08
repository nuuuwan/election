import { Alert } from "@mui/material";

export default function CustomAlert({ children, severity = "info" }) {
  return (
    <Alert
      severity={severity}
      sx={{
        p: 2,
        textAlign: "justify",
        m: "auto",
        marginTop: 10,
        marginBottom: 1,
        borderRadius: 3,
        maxWidth: 320,
      }}
    >
      {children}
    </Alert>
  );
}

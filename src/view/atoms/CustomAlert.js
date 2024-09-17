import { Alert } from "@mui/material";

export default function CustomAlert({ children, severity="info" }) {
  return (
    <Alert
      severity={severity}
      sx={{
        p: 2,
        textAlign: "justify",
        m: "auto",
        marginTop: 2,
        borderRadius: 2,
        maxWidth: 400,
      }}
    >
      {children}
    </Alert>
  );
}

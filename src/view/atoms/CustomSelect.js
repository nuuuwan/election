import { Select } from "@mui/material";

export default function CustomSelect({ children, value, onChange }) {
  return (
    <Select
      value={value}
      onChange={onChange}
      sx={{
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      {children}
    </Select>
  );
}

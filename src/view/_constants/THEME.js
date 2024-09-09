import { createTheme } from "@mui/material";

export const THEME_DATA =  {
    typography: {
      fontFamily: "Cairo",
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#888",
      },
      secondary: {
        main: "#ccc",
      },
    },
    background: {
      default: "#fff",

    },
  }

const THEME = createTheme(THEME_DATA);

export default THEME;

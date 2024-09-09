import { createTheme } from "@mui/material";

export const THEME_DATA =  {
    typography: {
      fontFamily: "Cairo",
      fontSize: 12,
    },
    palette: {
      primary: {
        main: "#888888",
      },
      secondary: {
        main: "#cccccc",
      },
    }
  }

const THEME = createTheme(THEME_DATA);

export default THEME;

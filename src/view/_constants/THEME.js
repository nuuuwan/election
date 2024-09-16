import { createTheme } from "@mui/material";
import CustomURLContext from "../../nonview/core/CustomURLContext";

function getThemeData() {
  const lang = CustomURLContext.get().lang;

  let fontFamily = "SUSE";
  let fontSize = 10;
  if (lang === "si") {
    fontFamily = "Noto Sans Sinhala";
    fontSize = 9;
  } else if (lang === "ta") {
    fontFamily = "Noto Sans Tamil";
    fontSize = 9;
  }

  return {
    typography: {
      fontFamily,
      fontSize,
    },
    palette: {
      primary: {
        main: "#444",
      },
      secondary: {
        main: "#888",
      },
    },
    HEXMAP: {
      N_COLS: 2,
    },
  };
}

const THEME_DATA = getThemeData();
const THEME = createTheme(THEME_DATA);

export { THEME_DATA };
export default THEME;

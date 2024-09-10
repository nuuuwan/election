import { createTheme } from "@mui/material";
import CustomURLContext from "../../nonview/core/CustomURLContext";

function getThemeData() {
  const lang = CustomURLContext.get().lang;

  let fontFamily = "Cairo";
  if (lang === "si") {
    fontFamily = "Noto Sans Sinhala";
  } else if (lang === "ta") {
    fontFamily = "Noto Sans Tamil";
  }

  return {
    typography: {
      fontFamily,
      fontSize: 11,
    },
    palette: {
      primary: {
        main: "#444",
      },
      secondary: {
        main: "#888",
      },
    },
  };
}

const THEME_DATA = getThemeData();
const THEME = createTheme(THEME_DATA);

export { THEME_DATA };
export default THEME;

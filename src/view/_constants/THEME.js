import { createTheme } from "@mui/material";
import CustomURLContext from "../../nonview/core/CustomURLContext";

function getThemeData() {
  const lang = CustomURLContext.get().lang;

  let fontFamily = "Cairo";
  let fontSize = 11;
  if (lang === "si") {
    fontFamily = "Noto Sans Sinhala";
    fontSize =11;
  } else if (lang === "ta") {
    fontFamily = "Noto Sans Tamil";
    fontSize = 11;
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
  };
}

const THEME_DATA = getThemeData();
const THEME = createTheme(THEME_DATA);

export { THEME_DATA };
export default THEME;

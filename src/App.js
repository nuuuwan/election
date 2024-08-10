import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BasePage } from "./view/pages";
import { Box } from "@mui/material";

import { Format } from "./nonview/base";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#444",
    },
    secondary: {
      main: "#f80",
    },
    info: {
      main: "#084",
    },
    warning: {
      main: "#f80",
    },
    error: {
      main: "#800",
    },
  },
  typography: {
    fontFamily: "Afacad",
    fontSize: Format.DEFAULT_FONT_SIZE,
  },
});

export default class App extends Component {
  render() {
    let width = Math.min(1600, window.innerWidth);
    let height = Math.min(900, window.innerHeight);
    const screenRatio = width / height;
    const ASPECT_RATIO = 16.0 / 9.0;
    if (screenRatio > ASPECT_RATIO) {
      width = height * ASPECT_RATIO;
    } else {
      height = width / ASPECT_RATIO;
    }
    return (
      <ThemeProvider theme={THEME}>
        <Box sx={{ margin: "auto", width, height, border: "1px solid #eee" }}>
          <BasePage />
        </Box>
      </ThemeProvider>
    );
  }
}

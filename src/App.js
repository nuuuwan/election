import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BasePage } from "./view/pages";

import { STYLE } from "./nonview/constants";

const THEME = createTheme({
  typography: {
    fontFamily: STYLE.FONT_FAMILY,
    fontSize: STYLE.FONT_SIZE,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <BasePage />
      </ThemeProvider>
    );
  }
}

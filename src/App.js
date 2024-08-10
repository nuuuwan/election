import React, { Component } from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import { BasePage } from "./view/pages";

import { Format } from "./nonview/base";

const THEME = createTheme({
  typography: {
    fontFamily: "Cabin",
    fontSize: Format.DEFAULT_FONT_SIZE,
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

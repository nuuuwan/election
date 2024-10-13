import React, { Component } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { THEME, BasePage } from "./view";

import "./App.css";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <BasePage />
      </ThemeProvider>
    );
  }
}

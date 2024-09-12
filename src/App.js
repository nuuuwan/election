import React, { Component } from "react";

import { ThemeProvider } from "@mui/material/styles";
import BasePage from "./view/pages/BasePage/BasePage";
import { THEME } from "./view/_constants";

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

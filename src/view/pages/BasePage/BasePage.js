import { Component } from "react";


import { BasePageView } from "../../../view/molecules";

import BasePageSettersMixin from "./BasePageSettersMixin";


import { DataProvider } from "../../../nonview/core/DataContext";
import CustomURLContext from "../../../nonview/core/CustomURLContext";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2019-11-16",
    // date: "2024-09-21",
    lang: "en",
    noScroll: false,
  };
  constructor(props) {
    super(props);
    this.state = Object.assign({}, BasePage.DEFAULT_STATE, CustomURLContext.get());
  }


  get key() {
    const { electionType, date, activePDID, lang } = this.state;
    return `${electionType}-${date}-${activePDID}-${lang}`;
  }

  render() {
    const {
      lang,
      electionType,
      date,
      noScroll,
      activePDID,
      nResultsDisplay,
    } = this.state;
    
    return (
      <DataProvider electionType={electionType} date={date} activePDID={activePDID} nResultsDisplay={nResultsDisplay}>
        <BasePageView
          key={this.key}
          lang={lang}
          electionType={electionType}
          date={date}
          noScroll={noScroll}
        
          setLang={this.setLang.bind(this)}
          setActivePDID={this.setActivePDID.bind(this)}
          setElection={this.setElection.bind(this)}
          setNResultsDisplay={this.setNResultsDisplay.bind(this)}  
        />
      </DataProvider>
    );
  }
}

Object.assign(BasePage.prototype, BasePageSettersMixin);

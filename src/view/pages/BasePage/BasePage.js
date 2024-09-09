import { Component } from "react";


import { BasePageView } from "../../../view/molecules";

import BasePageSettersMixin from "./BasePageSettersMixin";


import { DataProvider } from "../../../nonview/core/DataContext";
import CustomURLContext from "../../../nonview/core/CustomURLContext";

export default class BasePage extends Component {

  constructor(props) {
    super(props);
    this.state = CustomURLContext.get();
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

    const key = `${electionType}-${date}-${activePDID}-${lang}`;
    
    return (
      <DataProvider electionType={electionType} date={date} activePDID={activePDID} nResultsDisplay={nResultsDisplay}>
        <BasePageView
          key={key}
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

import { Component } from "react";
import { URLContext } from "../../../nonview/base";
import { Election, DB, DerivedData } from "../../../nonview/core";
import { BasePageView } from "../../../view/molecules";

import BasePageSettersMixin from "./BasePageSettersMixin";
import LoadingView from "./LoadingView";

import { DataProvider } from "../../../nonview/core/DataContext";

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
    this.state = Object.assign({}, BasePage.DEFAULT_STATE, this.getContext());
  }

  getContext() {
    let context = URLContext.get();
    if (context.nResultsDisplay) {
      context.nResultsDisplay = parseInt(context.nResultsDisplay);
    }
    if (context.noScroll && context.noScroll.toLowerCase() === "true") {
      context.noScroll = true;
    } else {
      context.noScroll = false;
    }
    return context;
  }

  async componentDidMount() {
    let { electionType, date, nResultsDisplay, activePDID } = this.state;


    const {pdIdx, elections} = await DB.load();
    const election = await Election.fromElectionTypeAndDate(electionType, date);
    
    ({ activePDID, nResultsDisplay } =
      DerivedData.getActivePDIDAndNResultDisplay({
        activePDID,
        nResultsDisplay,
        election,
      }));

    const { electionDisplay, projectedElection } = DerivedData.getDerived(
      nResultsDisplay,
      election,
      pdIdx, elections
    );

    this.setStateAndContext({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      election,
      electionDisplay,
      projectedElection,
      pdIdx, elections,
    });
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
      election,
      projectedElection,
      electionDisplay,
      noScroll,
    } = this.state;
    if (!election) {
      return <LoadingView electionType={electionType} date={date} />;
    }

    return (
      <DataProvider electionType={electionType} date={date}>
        <BasePageView
          key={this.key}
          lang={lang}
          electionDisplay={electionDisplay}
          projectedElection={projectedElection}
          setLang={this.setLang.bind(this)}
          setActivePDID={this.setActivePDID.bind(this)}
          setElection={this.setElection.bind(this)}
          setNResultsDisplay={this.setNResultsDisplay.bind(this)}
          noScroll={noScroll}
        />
      </DataProvider>
    );
  }
}

Object.assign(BasePage.prototype, BasePageSettersMixin);

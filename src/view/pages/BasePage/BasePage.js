import { Component } from "react";
import { URLContext } from "../../../nonview/base";
import { Election, DB } from "../../../nonview/core";
import { BasePageView } from "../../../view/molecules";

import BasePageSettersMixin from "./BasePageSettersMixin";
import { CircularProgress } from "@mui/material";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2019-11-16",
    // date: "2024-09-21",
    isPlaying: false,
  };
  constructor(props) {
    super(props);
    this.state = Object.assign({}, BasePage.DEFAULT_STATE, this.getContext());
  }

  getContext() {
    let context = URLContext.get();
    if (context.isPlaying === true || context.isPlaying === "true") {
      context.isPlaying = true;
    } else {
      context.isPlaying = false;
    }

    if (context.nResultsDisplay) {
      context.nResultsDisplay = parseInt(context.nResultsDisplay);
    }

    return context;
  }

  setStateAndContext(newState, funcRunAfter = undefined) {
    this.setState(
      newState,
      function () {
        const { electionType, date, isPlaying, nResultsDisplay, activePDID } =
          this.state;
        URLContext.set({
          electionType,
          date,
          isPlaying,
          nResultsDisplay,
          activePDID,
        });
        if (funcRunAfter) {
          funcRunAfter();
        }
      }.bind(this)
    );
  }

  getActivePDIDAndNResultDisplay({ activePDID, nResultsDisplay, election }) {
    if (activePDID !== undefined) {
      nResultsDisplay =
        election.pdResultsList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    } else if (nResultsDisplay !== undefined) {
      if (nResultsDisplay > 0) {
        activePDID = election.pdResultsList[nResultsDisplay - 1].entID;
      }
    } else {
      activePDID =
        election.pdResultsList[election.pdResultsList.length - 1].entID;
      nResultsDisplay = election.pdResultsList.length;
    }
    return { activePDID, nResultsDisplay };
  }

  async componentDidMount() {
    let { electionType, date, isPlaying, nResultsDisplay, activePDID } =
      this.state;

    const db = await DB.load();

    const election = await Election.fromElectionTypeAndDate(electionType, date);
    ({ activePDID, nResultsDisplay } = this.getActivePDIDAndNResultDisplay({
      activePDID,
      nResultsDisplay,
      election,
    }));

    this.setStateAndContext({
      electionType,
      date,
      isPlaying,
      nResultsDisplay,
      activePDID,
      // Derived
      election,
      db,
    });
  }

  get key() {
    const { electionType, date, activePDID } = this.state;
    return `${electionType}-${date}-${activePDID}`;
  }

  get electionDisplay() {
    const { election, nResultsDisplay } = this.state;
    return election.getElectionSubset(nResultsDisplay);
  }

  render() {
    const { isPlaying, election, db } = this.state;
    if (!election) {
      return <CircularProgress />;
    }

    return (
      <BasePageView
        election={election}
        isPlaying={isPlaying}
        //
        electionDisplay={this.electionDisplay}
        db={db}
        //
        pauseAnimation={this.pauseAnimation.bind(this)}
        playAnimation={this.playAnimation.bind(this)}
        setActivePDID={this.setActivePDID.bind(this)}
        setElection={this.setElection.bind(this)}
        setNResultsDisplay={this.setNResultsDisplay.bind(this)}
      />
    );
  }
}

Object.assign(BasePage.prototype, BasePageSettersMixin);

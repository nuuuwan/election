import { Component } from "react";
import { URLContext } from "../../../nonview/base";
import { Election, DB, ElectionModel } from "../../../nonview/core";
import { BasePageView } from "../../../view/molecules";

import BasePageSettersMixin from "./BasePageSettersMixin";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { STYLE, VERSION } from "../../../nonview/constants";

export default class BasePage extends Component {
  static DEFAULT_STATE = {
    electionType: "Presidential",
    date: "2019-11-16",
    // date: "2024-09-21",
    lang: "si",
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
    return context;
  }

  setStateAndContext(newState, funcRunAfter = undefined) {
    const oldState = this.state;
    
    const { electionType, date, nResultsDisplay, activePDID, lang } = Object.assign({}, oldState, newState);

    URLContext.set({
      electionType,
      date,
      nResultsDisplay,
      activePDID,
      lang,
    });

    this.setState(
      newState,
      function () {

 
        if (funcRunAfter) {
          funcRunAfter();
        }
      }
    );
  }

  getActivePDIDAndNResultDisplay({ activePDID, nResultsDisplay, election }) {
    if (activePDID !== undefined) {
      nResultsDisplay =
        election.pdResultList
          .map((result) => result.entID)
          .indexOf(activePDID) + 1;
    } else if (nResultsDisplay !== undefined) {
      if (nResultsDisplay > 0) {
        activePDID = election.pdResultList[nResultsDisplay - 1].entID;
      }
    } else {
      activePDID =
        election.pdResultList[election.pdResultList.length - 1].entID;
      nResultsDisplay = election.pdResultList.length;
    }
    return { activePDID, nResultsDisplay };
  }

  getPredictedElection(election, electionDisplay, db) {
    const releasedPDIDList = electionDisplay.pdIDList;
    const nonReleasedPDIDList = Object.keys(db.pdIdx).filter(
      (pdID) => !releasedPDIDList.includes(pdID)
    );

    const electionModel = new ElectionModel(
      db.elections,
      election,
      releasedPDIDList,
      nonReleasedPDIDList
    );
    const projectedElection = electionModel.getElectionNotReleasedPrediction();
    return projectedElection;
  }

  getDerived(nResultsDisplay, election, db) {
    const electionDisplay = election.getElectionSubset(nResultsDisplay);

    let projectedElection;
    if (nResultsDisplay > 0) {
      projectedElection = this.getPredictedElection(
        election,
        electionDisplay,
        db
      );
    }
    return { electionDisplay, projectedElection };
  }

  async componentDidMount() {
    let { electionType, date, nResultsDisplay, activePDID } = this.state;

    const db = await DB.load();

    // derived
    const election = await Election.fromElectionTypeAndDate(electionType, date);
    ({ activePDID, nResultsDisplay } = this.getActivePDIDAndNResultDisplay({
      activePDID,
      nResultsDisplay,
      election,
    }));

    const { electionDisplay, projectedElection } = this.getDerived(
      nResultsDisplay,
      election,
      db
    );

    this.setStateAndContext({
      electionType,
      date,
      nResultsDisplay,
      activePDID,

      // Derived
      election,
      electionDisplay,
      projectedElection,
      // Common
      db,
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
      db,
      projectedElection,
      electionDisplay,
    } = this.state;
    if (!election) {
      const tempElection = new Election(electionType, date);
      return (
        <Stack direction="" gap={1} sx={{ alignItems: "center" }}>
          <CircularProgress />
          <Typography variant="body1" color={STYLE.COLOR.LIGHT}>
            Loading {tempElection.title}
          </Typography>
          <Typography variant="caption" color={STYLE.COLOR.LIGHTER}>
            (v{VERSION.DATETIME_STR})
          </Typography>
        </Stack>
      );
    }

    return (
      <BasePageView
        key={this.key}
        //
        lang={lang}
        //
        election={election}
        //
        electionDisplay={electionDisplay}
        db={db}
        projectedElection={projectedElection}
        //
        setLang={this.setLang.bind(this)}
        setActivePDID={this.setActivePDID.bind(this)}
        setElection={this.setElection.bind(this)}
        setNResultsDisplay={this.setNResultsDisplay.bind(this)}
      />
    );
  }
}

Object.assign(BasePage.prototype, BasePageSettersMixin);

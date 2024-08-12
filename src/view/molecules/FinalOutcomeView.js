import { Box, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { PartyView } from "../atoms";

class FinalOutcome {
  static P_TOO_EARLY_TO_CALL = 0.5;
  constructor(result) {
    this.result = result;
  }

  get pWinner() {
    return this.result.partyToVotes.pWinner || 0.0;
  }

  get pUncertain() {
    return (
      this.result.partyToVotes.partyToPVotesSorted[Party.UNCERTAIN.id] || 0.0
    );
  }

  get isTooEarlyToCall() {
    return this.pUncertain > FinalOutcome.P_TOO_EARLY_TO_CALL;
  }

  get hasFirstPrefWinner() {
    return this.result.partyToVotes.pWinner > 0.5;
  }

  get likelyWinnerPartyIDs() {
    const pUncertain = this.pUncertain;
    return Object.entries(this.result.partyToVotes.partyToPVotesSorted)
      .filter(function ([partyID, pVotes]) {
        return pVotes + pUncertain > 0.5 && partyID !== Party.UNCERTAIN.id;
      })
      .map(function ([partyID, pVotes]) {
        return partyID;
      });
  }

  renderInsights() {
    if (this.isTooEarlyToCall) {
      return ["Too early to call"];
    }
    if (this.hasFirstPrefWinner) {
      const winningPartyID = this.result.partyToVotes.winningPartyID;
      return [
        <Box>
          <PartyView partyID={winningPartyID} /> projected to win on 1st
          preferences.
        </Box>,
      ];
    }
    const likelyWinnerPartyIDs = this.likelyWinnerPartyIDs;
    if (!likelyWinnerPartyIDs.length) {
      return ["2nd/3rd Preference Count Projected"];
    }
    return [
      "Too close call",
      <Box>
        {likelyWinnerPartyIDs.map(function (partyID, i) {
          const prefix = i === 0 ? "" : " or ";
          return (
            <Box component="span">
              {prefix}
              <PartyView key={partyID} partyID={partyID} />
            </Box>
          );
        })}{" "}
        could win on 1st Preferences.
      </Box>,
      "2nd/3rd Preference Count also possible.",
    ];
  }
}

export default function FinalOutcomeView({ result }) {
  const finalOutput = new FinalOutcome(result);
  return (
    <Typography variant="h6" sx={{ color: "gray" }}>
      {finalOutput.renderInsights().map(function (insight, i) {
        const fontSize = i === 0 ? "100%" : "50%";
        return (
          <Box key={i} sx={{ fontSize }}>
            {insight}
          </Box>
        );
      })}
    </Typography>
  );
}

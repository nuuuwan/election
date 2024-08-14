import { Box, Paper, Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { PartyView } from "../atoms";
import { Format, MathX } from "../../nonview/base";
import { STYLE } from "../../nonview/constants";
import SmartToyIcon from "@mui/icons-material/SmartToy";

function Confidence() {
  return (
    <Typography variant="caption">
      &gt;{Format.percent(FinalOutcome.P_BASE)} confidence
    </Typography>
  );
}

class FinalOutcome {
  static P_BASE = 0.9;
  static P_TOO_MUCH_UNCERTAINTY = 0.5;
  static MIN_N_RESULTS = 30;
  constructor(result, nResultsDisplay) {
    this.result = result;
    this.nResultsDisplay = nResultsDisplay;
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
    return this.nResultsDisplay <= FinalOutcome.MIN_N_RESULTS;
  }

  get isTooMuchUncertainty() {
    return this.pUncertain > FinalOutcome.P_TOO_MUCH_UNCERTAINTY;
  }

  get hasFirstPrefWinner() {
    return this.result.partyToVotes.pWinner > 0.5;
  }

  get likelyWinnerPartyInfoList() {
    const pUncertain = this.pUncertain;
    const likelyWinnerPartyInfoList = Object.entries(
      this.result.partyToVotes.partyToPVotesSorted
    )
      .filter(function ([partyID, pVotes]) {
        return pVotes + pUncertain > 0.5 && partyID !== Party.UNCERTAIN.id;
      })
      .map(function ([partyID, pVotes]) {
        const missingPVotes = 0.5 - pVotes;
        const ease = pUncertain / missingPVotes;
        return { partyID, ease };
      });

    const totalEase =
      MathX.sum(likelyWinnerPartyInfoList.map(({ ease }) => ease)) + 1;

    const normalizedLikelyWinnerPartyInfoList = likelyWinnerPartyInfoList.map(
      function ({ partyID, ease }) {
        return { partyID, p: ease / totalEase };
      }
    );

    return normalizedLikelyWinnerPartyInfoList;
  }

  renderInsights() {
    if (this.isTooEarlyToCall) {
      return [
        <Typography variant="h6">Too early to call</Typography>,
        <Typography variant="caption">
          Our Model needs &gt;{FinalOutcome.MIN_N_RESULTS} results to be
          confident.
        </Typography>,
      ];
    }
    if (this.isTooMuchUncertainty) {
      return [
        <Typography variant="h6">Too much uncertainty to call</Typography>,
        <Typography variant="caption">
          The voting preferences of &gt;
          {Format.percent(FinalOutcome.P_TOO_MUCH_UNCERTAINTY)} of voters are
          uncertain.
        </Typography>,
      ];
    }
    if (this.hasFirstPrefWinner) {
      const winningPartyID = this.result.partyToVotes.winningPartyID;
      return [
        <Typography variant="h6">
          <PartyView partyID={winningPartyID} /> wins on 1st preferences.
        </Typography>,
        <Confidence />,
      ];
    }
    const likelyWinnerPartyInfoList = this.likelyWinnerPartyInfoList;
    if (!likelyWinnerPartyInfoList.length) {
      return [
        <Typography variant="h6">
          2nd/3rd Preference Count Projected
        </Typography>,
        <Confidence />,
      ];
    }

    const pUncertainHappenning =
      1 - MathX.sum(likelyWinnerPartyInfoList.map(({ p }) => p));

    return [
      <Typography variant="h6">Too close to call</Typography>,
      <Typography variant="caption">
        Possible Outcomes & Probabilities
      </Typography>,
      <Box display="flex" justifyContent="center">
        <table>
          <tbody>
            {likelyWinnerPartyInfoList.map(function ({ partyID, p }, i) {
              return (
                <tr key={partyID}>
                  <td style={{ textAlign: "right", padding: 1 }}>
                    <Typography variant="body1">
                      {Format.percent(p * FinalOutcome.P_BASE)}
                    </Typography>
                  </td>
                  <td style={{ textAlign: "left", padding: 1, opacity: 0.5 }}>
                    <Stack
                      direction="row"
                      gap={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <PartyView partyID={partyID} />
                      <Typography variant="body2">
                        wins on 1st preferences
                      </Typography>
                    </Stack>
                  </td>
                </tr>
              );
            })}
            <tr>
              <td style={{ textAlign: "right", padding: 1 }}>
                <Typography variant="body1">
                  {Format.percent(pUncertainHappenning * FinalOutcome.P_BASE)}
                </Typography>
              </td>
              <td style={{ textAlign: "left", padding: 1, opacity: 0.5 }}>
                <Typography variant="body2">
                  2nd/3rd Preference Count
                </Typography>
              </td>
            </tr>
          </tbody>
        </table>
      </Box>,
    ];
  }
}
export default function FinalOutcomeView({ result, nResultsDisplay }) {
  const finalOutput = new FinalOutcome(result, nResultsDisplay);
  return (
    <Paper
      sx={{
        width: "fit-content",
        maxWidth: "80%",

        margin: "auto",
        p: 1.5,
        backgroundColor: STYLE.COLOR.LIGHTEST,
        elevation: 1,
      }}
    >
      <Stack
        direction="row"
        gap={1}
        sx={{ alignItems: "center", color: STYLE.COLOR.LIGHT }}
      >
        <SmartToyIcon sx={{ fontSize: "150%" }} />
        <Typography variant="caption">Model says</Typography>
      </Stack>
      {finalOutput.renderInsights().map(function (insight, i) {
        return (
          <Box key={i} sx={{ textAlign: "center", alignItems: "center" }}>
            {insight}
          </Box>
        );
      })}
    </Paper>
  );
}

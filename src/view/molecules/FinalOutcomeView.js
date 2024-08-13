import { Box, Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { PartyView } from "../atoms";
import { Format, MathX } from "../../nonview/base";

function Confidence() {
  return (
    <Typography variant="caption">
      &gt;{Format.percent(FinalOutcome.P_BASE)} confidence
    </Typography>
  );
}

class FinalOutcome {
  static P_BASE = 0.9;
  static P_TOO_EARLY_TO_CALL = 0.5;
  constructor(result, final) {
    this.result = result;
    this.final = final;
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

  renderInsights(final) {
    if (this.isTooEarlyToCall) {
      return ["Too early to call"];
    }
    if (this.hasFirstPrefWinner) {
      const winningPartyID = this.result.partyToVotes.winningPartyID;
      return [
        this.final ? (
          <Box>
            <PartyView partyID={winningPartyID} /> wins on 1st preferences.
          </Box>
        ) : (
          <Box>
            <PartyView partyID={winningPartyID} /> projected to win on 1st
            preferences.
          </Box>
        ),
        this.final ? null : <Confidence />,
      ];
    }
    const likelyWinnerPartyInfoList = this.likelyWinnerPartyInfoList;
    if (!likelyWinnerPartyInfoList.length) {
      return ["2nd/3rd Preference Count Projected", <Confidence />];
    }

    const pUncertainHappenning =
      1 - MathX.sum(likelyWinnerPartyInfoList.map(({ p }) => p));

    return [
      "Too close to call",
      <Box display="flex" justifyContent="center">
        <table>
          <tbody>
            {likelyWinnerPartyInfoList.map(function ({ partyID, p }, i) {
              return (
                <tr>
                  <td style={{ textAlign: "right", padding: 1 }}>
                    <Typography variant="body1">
                      {Format.percent(p * FinalOutcome.P_BASE)}
                    </Typography>
                  </td>
                  <td style={{ textAlign: "left", padding: 1 }}>
                    <Stack
                      direction="row"
                      gap={0.5}
                      sx={{ alignItems: "center" }}
                    >
                      <PartyView key={partyID} partyID={partyID} />
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
              <td style={{ textAlign: "left", padding: 1 }}>
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

export default function FinalOutcomeView({ result, final }) {
  const finalOutput = new FinalOutcome(result, final);
  return (
    <Typography variant="h6" sx={{ color: "gray" }}>
      {finalOutput.renderInsights().map(function (insight, i) {
        const fontSize = i === 0 ? "100%" : "50%";
        return (
          <Box
            key={i}
            sx={{ fontSize, textAlign: "center", alignItems: "center" }}
          >
            {insight}
          </Box>
        );
      })}
    </Typography>
  );
}

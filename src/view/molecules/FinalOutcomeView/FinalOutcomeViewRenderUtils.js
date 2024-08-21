import { Box, Stack, Typography } from "@mui/material";

import { Format, MathX, Translate } from "../../../nonview/base";
import { FinalOutcome } from "../../../nonview/core";
import { PartyView } from "../../../view/atoms";


function Confidence() {
  return (
    <Typography variant="caption">
      &gt;{Format.percent(FinalOutcome.P_BASE)} {Translate("Confidence")}
    </Typography>
  );
}

export default class FinalOutcomeViewRenderUtils {
  static renderTooMuchUncertainty() {
    return [
      <Typography variant="h6">{Translate("Error Margin too High")}</Typography>,
      <Typography variant="caption">
        {Translate("The voting preferences of ")} &gt;
        {Format.percent(FinalOutcome.P_TOO_MUCH_UNCERTAINTY)} 
        {Translate(" of votes are within the Error Margin. Please wait for more results")}.
      </Typography>,
    ];
  }

  static renderFirstPrefWinner(result) {
    const winningPartyID = result.partyToVotes.winningPartyID;
    return [
      <Typography variant="h6">
        <PartyView partyID={winningPartyID} /> {Translate("wins on 1st preferences")}.
      </Typography>,
      <Confidence />,
    ];
  }

  static renderLikelyhoodTablePartyRows(likelyWinnerPartyInfoList) {
    return likelyWinnerPartyInfoList.map(function ({ partyID, p }, i) {
      return (
        <tr key={partyID}>
          <td style={{ textAlign: "right", padding: 1 }}>
            <Typography variant="body1">
              {Format.percent(p * FinalOutcome.P_BASE)}
            </Typography>
          </td>
          <td style={{ textAlign: "left", padding: 1, opacity: 0.5 }}>
            <Stack direction="row" gap={0.5} sx={{ alignItems: "center" }}>
              <PartyView partyID={partyID} />
              <Typography variant="body2">{Translate("wins on 1st preferences")}</Typography>
            </Stack>
          </td>
        </tr>
      );
    });
  }

  static renderLikelyhoodTable(
    likelyWinnerPartyInfoList,
    pUncertainHappenning
  ) {
    return (
      <table>
        <tbody>
          {FinalOutcomeViewRenderUtils.renderLikelyhoodTablePartyRows(
            likelyWinnerPartyInfoList
          )}
          <tr>
            <td style={{ textAlign: "right", padding: 1 }}>
              <Typography variant="body1">
                {Format.percent(pUncertainHappenning * FinalOutcome.P_BASE)}
              </Typography>
            </td>
            <td style={{ textAlign: "left", padding: 1, opacity: 0.5 }}>
              <Typography variant="body2">{Translate("2nd/3rd Preference Counting")}</Typography>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  static renderTooCloseToCall(likelyWinnerPartyInfoList, pUncertainHappenning) {
    return [
      <Typography variant="h6">{Translate("Too close to call")}</Typography>,
      <Typography variant="caption">
        {Translate("Possible Outcomes & Probabilities")}
      </Typography>,
      <Box display="flex" justifyContent="center">
        {FinalOutcomeViewRenderUtils.renderLikelyhoodTable(
          likelyWinnerPartyInfoList,
          pUncertainHappenning
        )}
      </Box>,
    ];
  }

  static renderInsights(finalOutcome) {
    if (finalOutcome.isTooMuchUncertainty) {
      return FinalOutcomeViewRenderUtils.renderTooMuchUncertainty();
    }
    if (finalOutcome.hasFirstPrefWinner) {
      return FinalOutcomeViewRenderUtils.renderFirstPrefWinner(
        finalOutcome.result
      );
    }
    const likelyWinnerPartyInfoList = finalOutcome.likelyWinnerPartyInfoList;
    if (!likelyWinnerPartyInfoList.length) {
      return [
        <Typography variant="h6">
          {Translate("2nd/3rd Preference Counting Expected")}
        </Typography>,
        <Confidence />,
      ];
    }

    const pUncertainHappenning =
      1 - MathX.sum(likelyWinnerPartyInfoList.map(({ p }) => p));

    return FinalOutcomeViewRenderUtils.renderTooCloseToCall(
      likelyWinnerPartyInfoList,
      pUncertainHappenning
    );
  }
}

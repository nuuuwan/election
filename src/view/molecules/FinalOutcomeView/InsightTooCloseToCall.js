import { Box, Stack, Typography } from "@mui/material";
import { Format, Translate } from "../../../nonview";
import { PartyView } from "../..";

function renderLikelyhoodTablePartyRows(likelyWinnerPartyInfoList) {
  return likelyWinnerPartyInfoList.map(function ({ partyID, p }, i) {
    return (
      <tr key={partyID}>
        <td style={{ textAlign: "right", padding: 1 }}>
          <Typography variant="body1">{Format.percent(p)}</Typography>
        </td>
        <td style={{ textAlign: "left", padding: 1 }}>
          <Stack direction="row" gap={0.5} sx={{ alignItems: "center" }}>
            <PartyView partyID={partyID} />
            <Typography variant="body2">{Translate("wins")}</Typography>
          </Stack>
        </td>
      </tr>
    );
  });
}

function renderLikelyhoodTable(likelyWinnerPartyInfoList, pErrorHappenning) {
  return (
    <table>
      <tbody>
        {renderLikelyhoodTablePartyRows(likelyWinnerPartyInfoList)}
        {pErrorHappenning > 0 ? (
          <tr>
            <td style={{ textAlign: "right", padding: 1 }}>
              <Typography variant="body1">
                {Format.percent(pErrorHappenning)}
              </Typography>
            </td>
            <td style={{ textAlign: "left", padding: 1 }}>
              <Typography variant="body2">
                {Translate("2nd/3rd Preference Counting")}
              </Typography>
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  );
}

export default function InsightTooCloseToCall({
  likelyWinnerPartyInfoList,
  pErrorHappenning,
}) {
  return (
    <Box>
      <Typography variant="h4">{Translate("Too close to call")}</Typography>
      <Typography variant="caption" color="secondary">
        {Translate("Possible Outcomes & Probabilities")}
      </Typography>
      <Box display="flex" justifyContent="center">
        {renderLikelyhoodTable(likelyWinnerPartyInfoList, pErrorHappenning)}
      </Box>
    </Box>
  );
}

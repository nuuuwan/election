import { Box, Stack, Typography } from "@mui/material";
import { Format, Translate } from "../../../nonview/base";
import { PartyView } from "../../atoms";

function renderLikelyhoodTablePartyRows(likelyWinnerPartyInfoList) {
  return likelyWinnerPartyInfoList.map(function ({ partyID, p }, i) {
    return (
      <tr key={partyID}>
        <td style={{ textAlign: "right", padding: 1 }}>
          <Typography variant="body1">{Format.percent(p)}</Typography>
        </td>
        <td style={{ textAlign: "left", padding: 1, opacity: 0.5 }}>
          <Stack direction="row" gap={0.5} sx={{ alignItems: "center" }}>
            <PartyView partyID={partyID} />
            <Typography variant="body2">
              {Translate("wins on 1st preferences")}
            </Typography>
          </Stack>
        </td>
      </tr>
    );
  });
}

function renderLikelyhoodTable(
  likelyWinnerPartyInfoList,
  pUncertainHappenning
) {
  return (
    <table>
      <tbody>
        {renderLikelyhoodTablePartyRows(likelyWinnerPartyInfoList)}
        <tr>
          <td style={{ textAlign: "right", padding: 1 }}>
            <Typography variant="body1">
              {Format.percent(pUncertainHappenning)}
            </Typography>
          </td>
          <td style={{ textAlign: "left", padding: 1, opacity: 0.5 }}>
            <Typography variant="body2">
              {Translate("2nd/3rd Preference Counting")}
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default function InsightTooCloseToCall({
  likelyWinnerPartyInfoList,
  pUncertainHappenning,
}) {
  return (
    <Box>
      <Typography variant="h6">{Translate("Too close to call")}</Typography>
      <Typography variant="caption">
        {Translate("Possible Outcomes & Probabilities")}
      </Typography>
      <Box display="flex" justifyContent="center">
        {renderLikelyhoodTable(likelyWinnerPartyInfoList, pUncertainHappenning)}
      </Box>
    </Box>
  );
}

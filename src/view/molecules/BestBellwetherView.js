import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import { Bellwether,  } from "../../nonview/core";
import EntView from "../atoms/EntView";

import { PartyView } from "../atoms";
import { Format, Translate } from "../../nonview/base";

function BestBellwetherItem({ info }) {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay } = data;

  const winningPartyID =
    electionDisplay.resultIdx[info.entID].winningPartyID;
  const color = electionDisplay.resultIdx[info.entID].color;

  return (
    <Stack direction="row" gap={1} alignItems="center" sx={{ color }}>
      <PartyView partyID={winningPartyID} />
      <Typography variant="caption" component="span">
        {Format.percent(info.error)}
      </Typography>
      <Typography variant="caption" component="span">
        {`${info.nSame}/${info.n}`}
      </Typography>

      <EntView entID={info.entID} />
    </Stack>
  );
}

const N_DISPLAY = 10;

export default function BestBellwetherView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, elections, pdIdx } = data;
  const bestBellwetherInfoList = Bellwether.getBestBellwetherInfoList(
    elections,
    electionDisplay,
    pdIdx
  )
    .filter(function (info) {
      return (
        info.error < 0.1 && info.nSame > info.n * 0.5 && info.entID !== "LK"
      );
    })
    .slice(0, N_DISPLAY);

  const n = Math.min(bestBellwetherInfoList.length, N_DISPLAY);
  if (n === 0) {
    return null;
  }

  return (
    <Stack direction="column" sx={{maxWidth: 240, margin: "auto", alignItems:"left"}}>
      <Typography variant="h6">
        {Translate("Top Bellwether Results")}
      </Typography>
      <Typography variant="caption" color="secondary">
        {Translate("Ordered by Error")}
      </Typography>
      {bestBellwetherInfoList.map(function (info, i) {
        return <BestBellwetherItem key={i} info={info} />;
      })}
    </Stack>
  );
}

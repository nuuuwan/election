import { Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { CustomSelect } from "../atoms";

function buildRenderMenuItemInner(resultsIdx, edIdx) {
  const renderMenuItemInner = function (pd, i) {
    const result = resultsIdx[pd.id];
    if (!result) {
      return null;
    }

    const colorPD = Party.fromID(result.partyToVotes.winningPartyID).color;

    const edID = pd.id.substring(0, 5);
    const ed = edIdx[edID];
    const edResult = resultsIdx[edID];
    const colorED = Party.fromID(edResult.partyToVotes.winningPartyID).color;

    return (
      <Stack direction="column" gap={0}>
        <Typography variant="h6" color={colorPD}>
          {pd.name}
        </Typography>
        <Typography variant="caption" color={colorED} sx={{ opacity: 0.5 }}>
          {ed.name}
        </Typography>
      </Stack>
    );
  };
  return renderMenuItemInner;
}
export default function PDSelector({
  resultsIdx,
  pdIdx,
  edIdx,
  activePDID,
  setActivePDID,
}) {
  return (
    <CustomSelect
      dataList={Object.values(pdIdx)}
      value={pdIdx[activePDID]}
      getID={function (pd) {
        if (!pd) {
          return null;
        }
        return pd.name;
      }}
      onChange={function (pd) {
        setActivePDID(pd.id);
      }}
      renderMenuItemInner={buildRenderMenuItemInner(resultsIdx, edIdx)}
      getDividerKey={function (pd) {
        return pd.name.substring(0, 1);
      }}
    />
  );
}

import { Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { CustomSelect } from "../atoms";

function buildRenderMenuItemInner(resultIdx, edIdx, variant1, variant2) {
  const renderMenuItemInner = function (pd, i) {
    const result = resultIdx[pd.id];
    if (!result) {
      return null;
    }

    const colorPD = Party.fromID(result.partyToVotes.winningPartyID).color;

    const edID = pd.id.substring(0, 5);
    const ed = edIdx[edID];
    const edResult = resultIdx[edID];
    const colorED = Party.fromID(edResult.partyToVotes.winningPartyID).color;

    return (
      <Stack direction="row" gap={0.5} sx={{ alignItems: "center" }}>
        <Typography variant={variant1} color={colorPD}>
          {pd.name}
        </Typography>
        <Typography variant={variant2} color={colorED} sx={{ opacity: 0.5 }}>
          {ed.name}
        </Typography>
      </Stack>
    );
  };
  return renderMenuItemInner;
}
export default function PDSelector({
  election,
  db,
  activePDID,
  setActivePDID,
}) {
  return (
    <CustomSelect
      dataList={Object.values(db.pdIdx)}
      value={db.pdIdx[activePDID]}
      getID={function (pd) {
        if (!pd) {
          return null;
        }
        return pd.name;
      }}
      onChange={function (pd) {
        setActivePDID(pd.id);
      }}
      renderValue={buildRenderMenuItemInner(
        election.resultIdx,
        db.edIdx,
        "h6",
        "body1"
      )}
      renderMenuItemInner={buildRenderMenuItemInner(
        election.resultIdx,
        db.edIdx,
        "body1",
        "body2"
      )}
      getDividerKey={function (pd) {
        return pd.name.substring(0, 1);
      }}
    />
  );
}

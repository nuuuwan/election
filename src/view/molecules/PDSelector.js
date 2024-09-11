import { Stack, Typography } from "@mui/material";
import { Party } from "../../nonview/core";
import { CustomSelect } from "../atoms";
import { Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "./BasePage/BasePageHandlerProvider";

function buildRenderMenuItemInner(resultIdx, edIdx, variant1, variant2) {
  const renderMenuItemInner = function (pd, i) {
    const result = resultIdx[pd.id];
    if (!result) {
      return null;
    }

    const colorPD = result.color;

    const edID = pd.id.substring(0, 5);
    const ed = edIdx[edID];
    const edResult = resultIdx[edID];
    const colorED = edResult.color;

    return (
      <Stack direction="row" gap={0.5} sx={{ alignItems: "center" }}>
        <Typography variant={variant1} color={colorPD}>
          {Translate(pd.name)}
        </Typography>
        <Typography variant={variant2} color={colorED} sx={{ opacity: 0.5 }}>
          {Translate(ed.name)}
        </Typography>
      </Stack>
    );
  };
  return renderMenuItemInner;
}
export default function PDSelector({ activePDID }) {
  const { setActivePDID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { election, pdIdx, edIdx } = data;

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
      renderValue={buildRenderMenuItemInner(
        election.resultIdx,
        edIdx,
        "h6",
        "body1"
      )}
      renderMenuItemInner={buildRenderMenuItemInner(
        election.resultIdx,
        edIdx,
        "body1",
        "body2"
      )}
      getDividerKey={function (pd) {
        return pd.name.substring(0, 1);
      }}
    />
  );
}

import { Stack, Typography } from "@mui/material";
import { CustomSelect } from "..";
import { Translate } from "../../nonview";
import { useDataContext } from "../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../view/pages/BasePage/BasePageHandlerProvider";

function buildRenderMenuItemInner(resultIdx, edIdx) {
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
      <Stack direction="row" gap={0.5} alignItems="center">
        <Typography variant={"h6"} color={colorPD}>
          {Translate(pd.name)}
        </Typography>
        <Typography variant={"body1"} color={colorED} sx={{ opacity: 0.5 }}>
          {Translate(ed.name)}
        </Typography>
      </Stack>
    );
  };
  return renderMenuItemInner;
}

export default function PDSelector() {
  const { setActiveEntID } = useBasePageHandlerContext();
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { electionDisplay, pdIdx, edIdx, activeEntID } = data;

  return (
    <CustomSelect
      dataList={Object.values(pdIdx).filter(function (pd) {
        return electionDisplay.resultIdx[pd.id];
      })}
      value={pdIdx[activeEntID]}
      getID={(pd) => pd?.name}
      onChange={(pd) => setActiveEntID(pd.id)}
      renderValue={buildRenderMenuItemInner(electionDisplay.resultIdx, edIdx)}
      renderMenuItemInner={buildRenderMenuItemInner(
        electionDisplay.resultIdx,
        edIdx
      )}
      getDividerKey={(pd) => pd.name.substring(0, 1)}
    />
  );
}

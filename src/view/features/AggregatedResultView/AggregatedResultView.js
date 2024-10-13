import { useState } from "react";

import { Box } from "@mui/material";


import { TabSelector } from "../..";

import AggregatedResultUtils from "./AggregatedResultUtils";
import AggregatedResultViewGroup from "./AggregatedResultViewGroup";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";

export default function AggregatedResultView() {
  const data = useDataSlowContext();
  if (!data) {
    return null;
  }

  const groupToEntIDListGetter =
    AggregatedResultUtils.getGroupToEntIDListGetter(data);
  const groupList = Object.keys(groupToEntIDListGetter);

  const [group, setGroup] = useState(groupList[0]);

  return (
    <Box>
      <TabSelector value={group} onChange={setGroup} dataList={groupList} />

      <Box
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          mt: 3,
        }}
      >
        <AggregatedResultViewGroup
          entIDList={groupToEntIDListGetter[group](data)}
        />
      </Box>
    </Box>
  );
}

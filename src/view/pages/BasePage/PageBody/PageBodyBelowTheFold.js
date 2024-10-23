import { Stack } from '@mui/material';

import {
  AggregatedResultView,
  MonitoringView,
  DisclaimerView,
  ModelDetailsView,
  TabSelector,
} from '../../../';
import { useState } from 'react';

const CONTENT_IDX = {
  'aggregated results': <AggregatedResultView />,
  'model insights': <ModelDetailsView />,
  monitoring: <MonitoringView />,
  disclaimers: <DisclaimerView />,
};

export default function PageBodyBelowTheFold() {
  const valueList = Object.keys(CONTENT_IDX);
  const [mode, setMode] = useState(valueList[0]);

  return (
    <Stack
      direction="column"
      gap={3}
      sx={{
        marginTop: 15,
        p: 1,
        borderTop: '1px solid #eee',
      }}
    >
      <TabSelector value={mode} onChange={setMode} dataList={valueList} />
      {CONTENT_IDX[mode]}
    </Stack>
  );
}

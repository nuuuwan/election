import React from 'react';
import { Box } from '@mui/material';
import { ElectionSmallTitle } from '../../../view';

export default function CumResultsColumnView({ contentList }) {
  return (
    <Box sx={{ borderRadius: 4, width: 260, p: 0.5, m: 0.5 }}>
      {contentList.map(function (content, i) {
        return (
          <Box
            key={i}
            sx={{ marginBottom: 0.5 }}
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            display="flex"
          >
            {content}
          </Box>
        );
      })}
      <ElectionSmallTitle />
    </Box>
  );
}

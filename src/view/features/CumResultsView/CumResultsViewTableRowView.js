import React from 'react';
import { TableRow, TableCell } from '@mui/material';

export default function CumResultsViewTableRowView({ contentList }) {
  return (
    <TableRow>
      {contentList.map(function (content, i) {
        return (
          <TableCell
            key={i}
            style={{
              padding: 12,
              borderBottom: '1px solid #eee',
              textAlign: 'center',
            }}
          >
            {content}
          </TableCell>
        );
      })}
    </TableRow>
  );
}

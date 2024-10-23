import { useState } from 'react';
import TablePagination from '@mui/material/TablePagination';
import { Box } from '@mui/material';

const DEFAULT_ROWS_PER_PAGE = 10;

export default function CustomTablePagination({ dataList, renderTable }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_ROWS_PER_PAGE);

  const count = dataList.length;
  if (count <= DEFAULT_ROWS_PER_PAGE) {
    return renderTable(dataList);
  }

  const handleChangePage = function (event, newPage) {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value));
    setPage(0);
  };

  const displayDataList = dataList.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Box>
      {renderTable(displayDataList)}
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}

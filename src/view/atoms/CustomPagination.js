import { Pagination, PaginationItem } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";

import { useBasePageHandlerContext } from "../pages/BasePage/BasePageHandlerProvider";

function CustomPaginationItem({ getColor, ...props }) {
  const color = getColor(props.page);

  return (
    <PaginationItem
      {...props}
      sx={{
        color,

        "&.Mui-selected": {
          backgroundColor: color,
          color: "white",
        },
        "&:hover": {
          backgroundColor: color,
          opacity: 0.8,
          color: "white",
        },
      }}
    />
  );
}

export default function CustomPagination() {
  const data = useDataContext();
  const handlers = useBasePageHandlerContext();

  if (!data) {
    return null;
  }
  const { election, nResultsDisplay } = data;
  const pdResultList = election.pdResultList;
  const n = pdResultList.length;

  const { setNResultsDisplay } = handlers;
  const onChange = function (event, value) {
    setNResultsDisplay(value);
  };

  const getColor = function (page) {
    if (!page) {
      return "gray";
    }
    if (!pdResultList[page - 1]) {
      return "gray";
    }
    return pdResultList[page - 1].color;
  };

  return (
    <Pagination
      key={nResultsDisplay}
      count={n}
      defaultPage={nResultsDisplay}
      siblingCount={1}
      boundaryCount={1}
      onChange={onChange}
      renderItem={(item) => (
        <CustomPaginationItem {...item} getColor={getColor} />
      )}
    />
  );
}

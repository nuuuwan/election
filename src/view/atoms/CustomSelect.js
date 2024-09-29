import { Box, Divider, MenuItem, Select, Typography } from "@mui/material";
import { Translate } from "../../nonview";

const STYLE = {
  border: "none",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
  "& .MuiSelect-select": {
    margin: 0,
    padding: 0,
  },
};

function CustomSelectInner({
  value,
  getID,
  renderValue,
  renderMenuItemInner,
  getDividerKey,
  onChangeInner,
  dataIdx,
}) {
  let prevDividerKey;
  return (
    <Box>
      <Select
        value={getID(value)}
        onChange={onChangeInner}
        sx={STYLE}
        renderValue={function (value, i) {
          return renderValue(dataIdx[value], i);
        }}
      >
        {Object.entries(dataIdx).reduce(function (innerItems, [id, data], i) {
          const inner = renderMenuItemInner(data, i);
          const dividerKey = getDividerKey(data);
          if (prevDividerKey !== dividerKey && i !== 0) {
            innerItems.push(<Divider key={`divider-${i}`} />);
          }
          prevDividerKey = dividerKey;
          innerItems.push(
            <MenuItem key={id} value={id}>
              {inner}
            </MenuItem>
          );
          return innerItems;
        }, [])}
      </Select>
    </Box>
  );
}

function getDataIdx(dataList, getID, reverse) {
  let sortedDataList = dataList
    .filter((data) => getID(data) !== null)
    .sort(function (a, b) {
      return getID(a).localeCompare(getID(b));
    });
  if (reverse) {
    sortedDataList.reverse();
  }
  const dataIdx = Object.fromEntries(
    sortedDataList.map((data) => [getID(data), data])
  );
  return dataIdx;
}

function defaultGetID(data) {
  return data;
}

function defaultRenderValue(data) {
  return <Typography variant="h4">{Translate(data)}</Typography>;
}

function defaultRenderMenuItemInner(data) {
  return <Typography variant="body1">{Translate(data)}</Typography>;
}

function defaultGetDividerKey(data) {
  return null;
}

export default function CustomSelect({
  value,
  onChange,
  dataList,
  getID,
  renderValue,
  renderMenuItemInner,
  getDividerKey,
  reverse,
}) {
  getID = getID || defaultGetID;
  const dataIdx = getDataIdx(dataList, getID, reverse);

  const onChangeInner = function (event) {
    onChange(dataIdx[event.target.value]);
  };
  return (
    <CustomSelectInner
      value={value}
      getID={getID}
      renderValue={renderValue || defaultRenderValue}
      renderMenuItemInner={renderMenuItemInner || defaultRenderMenuItemInner}
      getDividerKey={getDividerKey || defaultGetDividerKey}
      onChangeInner={onChangeInner}
      dataIdx={dataIdx}
    />
  );
}

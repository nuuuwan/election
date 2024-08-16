import { Divider, MenuItem, Select } from "@mui/material";

const STYLE = {
  border: "none",
  "& .MuiOutlinedInput-notchedOutline": {
    border: "none",
  },
};

function CustomSelectInner({
  value,
  getID,
  renderMenuItemInner,
  getDividerKey,
  onChangeInner,
  dataIdx,
}) {
  let prevDividerKey;
  return (
    <Select value={getID(value)} onChange={onChangeInner} sx={STYLE}>
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

export default function CustomSelect({
  value,
  onChange,
  dataList,
  getID,
  renderMenuItemInner,
  getDividerKey,
  reverse,
}) {
  const dataIdx = getDataIdx(dataList, getID, reverse);

  const onChangeInner = function (event) {
    const id = event.target.value;
    onChange(dataIdx[id]);
  };
  return (
    <CustomSelectInner
      value={value}
      getID={getID}
      renderMenuItemInner={renderMenuItemInner}
      getDividerKey={getDividerKey}
      onChangeInner={onChangeInner}
      dataIdx={dataIdx}
    />
  );
}

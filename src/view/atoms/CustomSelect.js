import { Divider, MenuItem, Select } from "@mui/material";

const STYLE= {
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
  sortedDataList,
  prevDividerKey,
}) {
  return (
    <Select
      value={getID(value)}
      onChange={onChangeInner}
      sx={STYLE}
    >
      {sortedDataList.reduce(function (innerItems, data, i) {
        const inner = renderMenuItemInner(data, i);
        const dividerKey = getDividerKey(data);
        if (prevDividerKey !== dividerKey && i !== 0) {
          innerItems.push(<Divider key={`divider-${i}`} />);
        }
        prevDividerKey = dividerKey;
        innerItems.push( <MenuItem key={getID(data)} value={getID(data)}>
        {inner}
      </MenuItem>);
        return innerItems;
      }, [])}
    </Select>
  );
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

  const onChangeInner = function (event) {
    const id = event.target.value;
    onChange(dataIdx[id]);
  };

  let prevDividerKey = undefined;

  return (
    <CustomSelectInner
      value={value}
      getID={getID}
      renderMenuItemInner={renderMenuItemInner}
      getDividerKey={getDividerKey}
      onChangeInner={onChangeInner}
      sortedDataList={sortedDataList}
      prevDividerKey={prevDividerKey}
    />
  );
}

import { Divider, MenuItem, Select } from "@mui/material";

export default function CustomSelect({
  value,
  onChange,
  dataList,
  getID,
  renderMenuItemInner,
  getDividerKey,
}) {
  const sortedDataList = dataList.sort(function (a, b) {
    return getID(a).localeCompare(getID(b));
  });
  const dataIdx = Object.fromEntries(
    sortedDataList.map((data) => [getID(data), data])
  );

  const onChangeInner = function (event) {
    const id = event.target.value;
    onChange(dataIdx[id]);
  };

  let prevDividerKey = undefined;
  return (
    <Select
      value={value}
      onChange={onChangeInner}
      sx={{
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      {sortedDataList.reduce(function (innerItems, data, i) {
        const dividerKey = getDividerKey(data);
        if (prevDividerKey !== dividerKey && i !== 0) {
          innerItems.push(<Divider key={`divider-${i}`} />);
        }
        prevDividerKey = dividerKey;

        const innerItem = (
          <MenuItem key={getID(data)} value={getID(data)}>
            {renderMenuItemInner(data, i)}
          </MenuItem>
        );
        innerItems.push(innerItem);

        return innerItems;
      }, [])}
    </Select>
  );
}

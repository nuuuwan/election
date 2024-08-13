import { Divider, MenuItem, Select } from "@mui/material";
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
    <Select
      value={getID(value)}
      onChange={onChangeInner}
      sx={{
        border: "none",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
      }}
    >
      {sortedDataList.reduce(function (innerItems, data, i) {
        const inner = renderMenuItemInner(data, i);
        if (!inner) {
          return innerItems;
        }

        const dividerKey = getDividerKey(data);
        if (prevDividerKey !== dividerKey && i !== 0) {
          innerItems.push(<Divider key={`divider-${i}`} />);
        }
        prevDividerKey = dividerKey;

        const innerItem = (
          <MenuItem key={getID(data)} value={getID(data)}>
            {inner}
          </MenuItem>
        );
        innerItems.push(innerItem);

        return innerItems;
      }, [])}
    </Select>
  );
}

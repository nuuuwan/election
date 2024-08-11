import { Box, IconButton, Stack } from "@mui/material";
import SingleColumnMode from "../pages/BasePage/SingleColumnMode";
import { STYLE } from "../../nonview/constants";

export default function SelectorSingleColumnMode({
  selectedSingleColumnMode,
  setSingleColumnMode,
}) {
  return (
    <Box
      sx={{
        position: "fixed",
        bottom: STYLE.FOOTER_HEIGHT,
        right: 0,
        margin: "auto",
        padding: 3,
      }}
    >
      <Stack direction="row" gap={0}>
        {SingleColumnMode.listAll().map(function (singleColumnMode) {
          const onClick = function () {
            setSingleColumnMode(singleColumnMode);
          };
          const isSelected =
            selectedSingleColumnMode.id === singleColumnMode.id;
          return (
            <IconButton
              key={singleColumnMode.id}
              onClick={onClick}
              disabled={isSelected}
            >
              <singleColumnMode.Icon
                sx={{ color: isSelected ? "#ccc" : "#444" }}
              />
            </IconButton>
          );
        })}
      </Stack>
    </Box>
  );
}

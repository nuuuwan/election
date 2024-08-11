import { Box, IconButton, Stack, Tooltip } from "@mui/material";
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
            <Tooltip
              key={singleColumnMode.id}
              title={singleColumnMode.description}
            >
              <IconButton onClick={onClick}>
                <singleColumnMode.Icon
                  sx={{ color: isSelected ? "#444" : "#ccc" }}
                />
              </IconButton>
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
}

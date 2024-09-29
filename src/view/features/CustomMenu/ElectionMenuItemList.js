import { MenuItem } from "@mui/material";
import { useDataContext } from "../../../nonview/core/DataProvider";
import { useBasePageHandlerContext } from "../../pages/BasePage/BasePageHandlerProvider";

import { CheckIcon } from "../..";

export default function ElectionMenuItemList({ handleClose }) {
  const data = useDataContext();
  const { setElection } = useBasePageHandlerContext();
  if (!data) {
    return null;
  }
  const { elections, electionDisplay } = data;
  return (
    <>
      {elections
        .slice()
        .reverse()
        .map(function (election, iElection) {
          const onClick = function () {
            handleClose();
            setElection(election);
          };

          const isSelected = election.date === electionDisplay.date;

          return (
            <MenuItem
              key={iElection}
              onClick={onClick}
              sx={{ color: election.color }}
            >
              <CheckIcon isSelected={isSelected} />
              {election.title}
            </MenuItem>
          );
        })}
    </>
  );
}

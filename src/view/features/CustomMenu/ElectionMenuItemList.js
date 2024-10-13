import { MenuItem } from "@mui/material";

import { useBasePageHandlerContext } from "../../pages/BasePage/BasePageHandlerProvider";

import { CheckIcon, CustomLoadingProgress } from "../..";
import { useDataSlowContext } from "../../../nonview/core/DataSlowProvider";

export default function ElectionMenuItemList({ handleClose }) {
  const data = useDataSlowContext();
  const { setElection } = useBasePageHandlerContext();
  if (!data) {
    return <CustomLoadingProgress />;
  }
  const { electionHistory, electionDisplay } = data;
  return (
    <>
      {electionHistory.elections
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
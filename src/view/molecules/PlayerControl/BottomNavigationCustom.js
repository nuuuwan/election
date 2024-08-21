import { BottomNavigation } from "@mui/material";

import Replay10Icon from "@mui/icons-material/Replay10";
import Forward10Icon from "@mui/icons-material/Forward10";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import BottomNavigationActionCustom from "./BottomNavigationActionCustom";
import { STYLE } from "../../../nonview/constants";

const N_JUMP_STEPS = 10;

function getBottomNavigationActionConfigs(
  setNResultsDisplay,
  nResultsDisplay,
  nResults
) {
  return [
    {
      Icon: Replay10Icon,
      onClick: () =>
        setNResultsDisplay(Math.max(0, nResultsDisplay - N_JUMP_STEPS)),
      disabled: nResultsDisplay === 0,
    },
    {
      Icon: KeyboardArrowLeftIcon,
      onClick: () => setNResultsDisplay(Math.max(0, nResultsDisplay - 1)),
      disabled: nResultsDisplay === 0,
    },

    {
      Icon: KeyboardArrowRightIcon,
      onClick: () =>
        setNResultsDisplay(Math.min(nResults, nResultsDisplay + 1)),
      disabled: nResultsDisplay === nResults,
    },
    {
      Icon: Forward10Icon,
      onClick: () =>
        setNResultsDisplay(Math.min(nResults, nResultsDisplay + N_JUMP_STEPS)),
      disabled: nResultsDisplay === nResults,
    },
  ];
}
const STYLE_INNER = {
  backgroundColor: STYLE.COLOR.LIGHTEST,
};

export default function BottomNavigationCustom({
  nResultsDisplay,
  nResults,
  setNResultsDisplay,
}) {
  return (
    <BottomNavigation sx={STYLE_INNER}>
      {getBottomNavigationActionConfigs(
        setNResultsDisplay,
        nResultsDisplay,
        nResults
      ).map(function (config, i) {
        return (
          <BottomNavigationActionCustom
            key={i}
            Icon={config.Icon}
            onClick={config.onClick}
            disabled={config.disabled}
          />
        );
      })}
    </BottomNavigation>
  );
}

import { Typography } from "@mui/material";
import { Bellwether } from "../../nonview/core";
import { Format, Translate } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";
import { CustomAlert } from "../atoms";

export default function BellwetherView() {
  const data = useDataContext();
  if (!data) {
    return null;
  }
  const { allRegionIdx, electionDisplay, elections, activeEntID } = data;

  const { n, nSame, error } = Bellwether.getStats(
    elections,
    electionDisplay,
    activeEntID
  );
  if (n === 0) {
    return null;
  }

  const ent = allRegionIdx[activeEntID];

  return (
    <CustomAlert>
      <Typography variant="body1">
        {Translate(
          "In %1 out of the last %2 Presidential Elections, the candidate who won in %3 also won nationally. Historically, the average variation in party vote percentages from the national result has been %4. However, it's important to note that past performance does not guarantee future outcomes.",
          [nSame, n, Translate(ent.name), Format.percent(error)]
        )}
      </Typography>
    </CustomAlert>
  );
}

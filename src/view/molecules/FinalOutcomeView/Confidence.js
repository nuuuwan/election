import { Typography } from "@mui/material";
import { Format, Translate } from "../../../nonview/base";
import { FinalOutcome } from "../../../nonview/core";


export default function Confidence() {
    return (
        <Typography variant="caption">
        &gt;{Format.percent(FinalOutcome.P_BASE)} {Translate("Confidence")}
      </Typography>
    );
}
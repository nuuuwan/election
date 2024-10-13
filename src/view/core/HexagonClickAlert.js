import React from "react";
import { Typography } from "@mui/material";
import { Translate } from "../../nonview";
import { CustomAlert } from "..";

export default function HexagonClickAlert() {
    return (
        <CustomAlert>
            <Typography variant="body1">
                {Translate(
                    "Click on the hexagons to view Polling Division and Postal Vote results, or to see the most recent results for Provinces and Electoral Districts."
                )}
            </Typography>{" "}
        </CustomAlert>
    );
}

import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../nonview/core/DataProvider";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ResultTimeView({entID}) {
    const data = useDataContext();
    if (!data) {
      return null;
    }
    const {electionDisplay} = data;
    const result = electionDisplay.resultIdx[entID];
    if (!result.resultTime) {
        return null;
    }

    return (
        <Stack direction="row" alignItems="center" gap={0.3} sx={{color: "lightgray"}}>
            <AccessTimeIcon />
            <Typography variant="body1" >
                
                
                {result.resultTime}</Typography>
        </Stack>
    );
}
import { Box, Stack, Typography } from "@mui/material";


import { MathX, Translate, Format } from "../../nonview/base";
import { useDataContext } from "../../nonview/core/DataProvider";
import { CustomAlert } from "../atoms";
import { BarChart } from "@mui/x-charts";



function BanfordView() {
    const data = useDataContext();
    if (data === null) {
        return null;
    }
    const {electionDisplay} = data;

    const numList = electionDisplay.baseResultList.reduce(
        function(numList, result) {
            const votes = Object.values(result.partyToVotes.partyToVotes);
            return numList.concat(votes);
        },
        [],
    )
    const leadToN = numList.reduce(
        function(leadToN, num) {
            const lead = parseInt(num.toString()[0]);
            if (lead > 0) {
                leadToN[lead] = leadToN[lead] + 1 || 1;
            }
            return leadToN;
        },
        {},
    )

    const totalN = MathX.sum(Object.values(leadToN));
    const leadToP = Object.fromEntries(
        Object.entries(leadToN).map(
            ([lead, n]) => [lead, n / totalN]
        )
    )

    const dataset = Object.entries(leadToP).map(
        ([lead, p]) => ({ lead, p })
    )

    return (
        <Stack direction="column" sx={{alignItems: "center"}}>
            <Typography variant="h5">Benford's Law</Typography>
            <CustomAlert>
                {Translate("Benford's law is an observation that in many real-life sets of numerical data (including votes in elections), the leading digit is likely to be small. The number 1 appears as the leading significant digit about 30% of the time, while 9 appears as the leading significant digit less than 5% of the time.")}
            </CustomAlert>
            <BarChart
                dataset={dataset}
                yAxis={[{ scaleType: 'linear', dataKey: 'p', valueFormatter: p => Format.percentAbs(p) }]}
                xAxis={[{ scaleType: 'band', dataKey: 'lead', label:Translate("Leading digit of votes received by parties") + ` (n=${totalN})` }]}
                series={[{ dataKey: 'p', valueFormatter: p => Format.percent(p) }]}
                width={600}
                height={400}
            />
        </Stack>
    )
}

export default function MonitoringView() {
    return (
        <Box>
            <Typography variant="h4">Monitoring</Typography>
            <BanfordView/>
        </Box>
    );
}
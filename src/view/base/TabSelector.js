import { Box, Tab, Tabs } from "@mui/material";
import { Translate } from "../../nonview";

export default function TabSelector({ value, onChange, dataList }) {
    return (
        <Box sx={{ justifyContent: "center", display: "flex" }}>
            <Tabs value={value}>
                {dataList.map(function (data, iData) {
                    const onClick = function () {
                        onChange(data);
                    };
                    return (
                        <Tab
                            key={iData}
                            value={data}
                            label={Translate(data)}
                            onClick={onClick}
                        />
                    );
                })}
            </Tabs>
        </Box>
    );
}

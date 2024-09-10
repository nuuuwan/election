import { Box,  } from "@mui/material";

export default function IfElse({condition, children}) {
    const firstChild = children[0];
    const otherChildren = children.slice(1);
    
    if (condition) {
        return firstChild;
    }
    return (
        <Box>
            {otherChildren}
        </Box>
    );

}
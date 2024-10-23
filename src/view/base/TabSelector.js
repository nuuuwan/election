import React from 'react';
import { Box, Stack, Tab, Tabs } from '@mui/material';
import { Translate } from '../../nonview';

export default function TabSelector({ valueIdx }) {
  const valueList = Object.keys(valueIdx);
  const [selectedValue, setSelectedValue] = React.useState(valueList[0]);
  const content = valueIdx[selectedValue];

  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        mt: 3,
      }}
    >
      <Tabs value={selectedValue}>
        {valueList.map(function (value, iValue) {
          const onClick = function () {
            setSelectedValue(value);
          };
          return (
            <Tab
              key={iValue}
              value={value}
              label={Translate(value)}
              onClick={onClick}
            />
          );
        })}
      </Tabs>

      <Box>{content}</Box>
    </Stack>
  );
}

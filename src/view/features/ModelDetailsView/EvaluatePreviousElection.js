import React from 'react';
import { Typography } from '@mui/material';
import { Translate } from '../../../nonview';

export default function EvaluatePreviousElection() {
  return (
    <>
      <Typography variant="h5">
        {Translate('Evaluate Previous Election')}
      </Typography>
    </>
  );
}

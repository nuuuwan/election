import { Stack, Typography } from '@mui/material';
import { Translate } from '../../nonview';
import { CustomAlert } from '..';

export default function DisclaimerView() {
  return (
    <Stack direction="column" gap={3}>
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate(
            'Sinhala and Tamil translations were generated automatically and may contain inaccuracies. For the most accurate information, please refer to the English version if in doubt.',
          )}
        </Typography>
      </CustomAlert>
      <CustomAlert severity="warning">
        <Typography variant="body1">
          {Translate(
            'Due to technical issues, there may be a delay between the official release of results and their appearance on this app. To ensure you have the latest information, refresh the app manually. The app will also automatically refresh every 60 seconds.',
          )}
        </Typography>
      </CustomAlert>
    </Stack>
  );
}

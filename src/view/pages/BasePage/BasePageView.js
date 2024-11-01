import { Box } from '@mui/material';

import PageHeader from './PageHeader';
import PageBody from './PageBody/PageBody';
import PageFooter from './PageFooter';

export default function BasePageView() {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <PageHeader />
      <PageBody />
      <PageFooter />
    </Box>
  );
}

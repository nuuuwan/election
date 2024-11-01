import { IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

export default function RefreshButton() {
  const onClickRefresh = function () {
    localStorage.clear();
    console.warn('🧹localStorage cleared!');
    window.location = '/election';
  };

  return (
    <IconButton onClick={onClickRefresh}>
      <RefreshIcon sx={{ color: 'white' }} />
    </IconButton>
  );
}

import { Paths } from '@constants/paths';
import { CircularProgress, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    navigate(Paths.LOGIN, { replace: true });
  }, []);

  return (
    <Stack
      spacing={4}
      sx={{
        mt: 10,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <CircularProgress size={64} />
    </Stack>
  );
};

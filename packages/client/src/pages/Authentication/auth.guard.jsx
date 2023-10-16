import { useEffect } from 'react';
import { Paths } from '@constants/paths';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context.jsx';

export const AuthGuard = () => {
  const { token, decoded_token, initialized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (initialized && !token) {
      navigate(Paths.LOGIN);
    } else if (initialized && decoded_token?.role !== 1) {
      navigate(Paths.PERMISSION_REQUIRED);
    }
  }, [initialized, token, decoded_token]);

  return <Outlet />;
};

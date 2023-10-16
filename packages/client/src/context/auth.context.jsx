import { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Paths } from '@constants/paths';

const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const [initialized, setInitialized] = useState(false);
  const [token, setToken] = useState();
  const [decoded_token, setDecodedToken] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = restoreToken();

    if (token) {
      const decoded_token = jwt_decode(token);
      const current_time = new Date().getTime() / 1000;

      if (current_time > decoded_token.exp) {
        navigate(Paths.LOGOUT);
      }

      setToken(token);
      setDecodedToken(decoded_token);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (token) {
      saveToken(token);
      setDecodedToken(jwt_decode(token));
    }
  }, [token]);

  return <AuthContext.Provider value={{ token, decoded_token, setToken, initialized }} {...props} />;
};

const saveToken = (token) => {
  localStorage.setItem('token', token);
};

const restoreToken = () => {
  return localStorage.getItem('token');
};

export const useAuth = () => useContext(AuthContext);

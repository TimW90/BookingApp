import { useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setJwtHeader } from '../../api/api';
import PropTypes from 'prop-types';
import { createContext } from 'react';
import { useAlerts } from '../alerts/AlertContext';
import { loginUser } from '@/api/userApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { setFlashMessage } = useAlerts();

  const processToken = (token) => {
    const decodedUser = jwtDecode(token);
    console.log(decodedUser);
    setUser(decodedUser);
    setIsAdmin(decodedUser.roles.includes('ADMIN'));
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      processToken(token);
    }
  }, []);

  const handleLogin = useCallback(
    async (loginRequest) => {
      try {
        console.log(loginRequest);
        const response = await loginUser(loginRequest);
        const token = response.data;
        localStorage.setItem('token', token);
        processToken(token);
        setFlashMessage('Logged in successfully!');
        setJwtHeader(token);
      } catch (error) {
        console.error('Error while trying to log in', error);
        throw error;
      }
    },
    [setFlashMessage]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    setFlashMessage('Logged out successfully!');
  }, [setFlashMessage]);

  const contextValue = useMemo(
    () => ({
      user,
      isAdmin,
      handleLogin,
      handleLogout,
    }),
    [user, isAdmin, handleLogin, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);

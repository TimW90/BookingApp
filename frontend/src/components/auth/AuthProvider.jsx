import { useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setJwtHeader } from '../../api/api';
import PropTypes from 'prop-types';
import { createContext } from 'react';
import { useAlerts } from '../alerts/AlertContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const { setFlashMessage } = useAlerts();

  const processToken = (token) => {
    const decodedUser = jwtDecode(token);
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
    (token) => {
      localStorage.setItem('token', token);
      processToken(token);
      setFlashMessage('Logged in successfully!');
      setJwtHeader(token);
    },
    [setFlashMessage]
  );

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    setFlashMessage('Logged out successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
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

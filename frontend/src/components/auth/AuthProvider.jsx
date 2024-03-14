import { useState, useContext, useMemo, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { setJwtHeader } from '../../api/api';
import PropTypes from 'prop-types';
import { createContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

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
    setIsLoading(false);
  }, []);

  const handleLogin = useCallback((token) => {
    localStorage.setItem('token', token);
    processToken(token);
    setJwtHeader(token);
    setSuccessMessage('Logged in successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAdmin(false);
    setSuccessMessage('Logged out successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      successMessage,
      isAdmin,
      isLoading,
      handleLogin,
      handleLogout,
    }),
    [user, isAdmin, isLoading, successMessage, handleLogin, handleLogout]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);

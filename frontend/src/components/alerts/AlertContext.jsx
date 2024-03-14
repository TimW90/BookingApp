import { useState, useEffect, useContext } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFlashMessage('');
    }, 2000);
  }, [flashMessage]);

  const contextValue = {
    setFlashMessage,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertContext);

AlertProvider.propTypes = {
  children: PropTypes.any,
};

import { useState, useEffect, useContext } from 'react';
import { createContext } from 'react';
import PropTypes from 'prop-types';
import SuccessToast from './SuccessToast';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [flashMessage, setFlashMessage] = useState('');

  useEffect(() => {
    setTimeout(() => {
      setFlashMessage('');
    }, 2000);
  }, [flashMessage]);

  const contextValue = {
    flashMessage,
    setFlashMessage,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}

      {flashMessage && <SuccessToast message={flashMessage} />}
    </AlertContext.Provider>
  );
};

export const useAlerts = () => useContext(AlertContext);

AlertProvider.propTypes = {
  children: PropTypes.any,
};

import { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const popupRef = useRef(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!popupRef.current) return;

    isPopupOpen ? popupRef.current.close() : popupRef.current.showModal();
  };

  const contextValue = {
    popupContent,
    popupRef,
    togglePopup,
    setPopupContent,
  };

  return (
    <PopupContext.Provider value={contextValue}>
      {children}

      <Popup togglePopup={togglePopup} ref={popupRef}>
        {popupContent}
      </Popup>
    </PopupContext.Provider>
  );
};

PopupProvider.propTypes = {
  children: PropTypes.node,
};

export const usePopup = () => useContext(PopupContext);

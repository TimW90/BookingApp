import { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const popupRef = useRef(null);

  const togglePopup = () => {
    if (!popupRef.current) return;

    const isOpen = popupRef.current.hasAttribute('open');
    isOpen ? popupRef.current.close() : popupRef.current.showModal()
    setIsPopupOpen(!isOpen); // Toggle so if currently open set it too false and vice versa
  };

  const contextValue = {
    popupContent,
    popupRef,
    togglePopup,
    setPopupContent,
    isPopupOpen,
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

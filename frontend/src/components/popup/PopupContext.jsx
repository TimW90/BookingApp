import { createContext, useContext, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Popup from './Popup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popupContent, setPopupContent] = useState(null);
  const popupRef = useRef(null);

  const togglePopup = () => {
    if (!popupRef.current) return;
    popupRef.current.hasAttribute('open')
      ? popupRef.current.close()
      : popupRef.current.showModal();
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

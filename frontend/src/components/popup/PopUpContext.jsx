import { createContext, useContext, useState, useRef } from 'react';

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

  return (
    <PopupContext.Provider
      value={{ popupContent, popupRef, togglePopup, setPopupContent }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);

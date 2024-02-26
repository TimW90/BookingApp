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

  const contextValue = {
    popupContent,
    setPopupContent,
    togglePopup,
    popupRef,
  };

  return (
    <PopupContext.Provider value={{ contextValue }}>
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);

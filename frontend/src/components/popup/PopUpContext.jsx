import { createContext, useContext, useState } from 'react';
import Popup from './Popup';

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(null);

  const openPopup = (content) => {
    setContent(content);
    setIsOpen(true);
  };

  const closePopup = () => setIsOpen(false);

  return (
    <PopupContext.Provider value={{ isOpen, openPopup, closePopup }}>
      {children}
      {isOpen && <Popup onClose={closePopup}>{content}</Popup>}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);

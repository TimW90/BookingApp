import PropTypes from 'prop-types';
import { usePopup } from './PopupContext';

// PopupButton component for reusability across the application, this sets the content and toggles the 
const PopupButton = ({ popupContent, children}) => {
    const { togglePopup, setPopupContent } = usePopup();

  return (
    <button type="button"
    onClick={() => {
        setPopupContent(popupContent);
        togglePopup();
        }}>
      {children}
      </button>
  );
}

PopupButton.propTypes = {
    popupContent: PropTypes.node,
    children: PropTypes.node,
}

export default PopupButton;
     

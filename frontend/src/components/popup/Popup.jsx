import PropTypes from 'prop-types';
import { usePopup } from './PopUpContext';

const Popup = ({ onClose, children }) => {
  const { isOpen } = usePopup();

  if (!isOpen) {
    return;
  }

  return (
    <div className="modal justify-center">
      <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
        {children}
        <button
          type="button"
          className="absolute top-0 right-0 p-4"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Popup;

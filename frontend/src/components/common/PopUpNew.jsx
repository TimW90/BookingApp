import PropTypes from 'prop-types';

const PopUp = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return;
  }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
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

PopUp.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default PopUp;

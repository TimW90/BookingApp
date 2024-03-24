import { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Popup = forwardRef(({ children, togglePopup }, ref) => {
  return (
    <dialog
      className="modal justify-center"
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          togglePopup();
        }
      }}
    >
      <div className="modal-box min-w-md px-8 m-10 scrollbar-hide">
        {children}
        <button
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          onClick={togglePopup}
        >
          X
        </button>
      </div>
    </dialog>
  );
});

Popup.displayName = 'Popup';

Popup.propTypes = {
  children: PropTypes.node,
  togglePopup: PropTypes.func,
};

export default Popup;

import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
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
      <div className="modal-box px-8 scrollbar-hide">
        {children}
        <button onClick={togglePopup}>Close</button>
      </div>
    </dialog>
  );
});
export default Popup;

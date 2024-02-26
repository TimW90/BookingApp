import { forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const Popup = forwardRef(({ children, toggleDialog }, ref) => {
  return (
    <dialog
      className="modal justify-center"
      ref={ref}
      onClick={(e) => {
        if (e.currentTarget === e.target) {
          toggleDialog();
        }
      }}
    >
      <div className="modal-box px-8 scrollbar-hide">
        {children}
        <button onClick={toggleDialog}>Close</button>
      </div>
    </dialog>
  );
});
export default Popup;

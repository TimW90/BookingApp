import PropTypes from 'prop-types';

const Dialog = ({ children, buttonText }) => {
  const toggleDialog = () => {
    const modal = document.getElementById('my_modal_2');
    modal.open ? modal.close() : modal.showModal();
  };

  return (
    <>
      <button className="btn" onClick={toggleDialog}>
        {buttonText}
      </button>
      <dialog id="my_modal_2" className="modal justify-center">
        <div className="flex flex-col justify-center items-center min-h-screen">
          <div className="modal-box px-8 scrollbar-hide">
            {children}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={toggleDialog}
            >
              X
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

Dialog.propTypes = {
  children: PropTypes.node,
  buttonText: PropTypes.string,
};

export default Dialog;

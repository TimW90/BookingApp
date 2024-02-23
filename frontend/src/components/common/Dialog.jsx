import PropTypes from 'prop-types';

const Dialog = ({ children, buttonText }) => {
  return (
    <>
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_2').showModal()}
      >
        {buttonText}
      </button>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <dialog id="my_modal_2" className="modal justify-center">
          <div className="modal-box px-8">{children}</div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
};

Dialog.propTypes = {
  children: PropTypes.node,
  buttonText: PropTypes.string,
};

export default Dialog;

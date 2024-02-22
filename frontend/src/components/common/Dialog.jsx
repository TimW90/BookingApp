import PropTypes from 'prop-types';

const Dialog = ({ children, buttonText }) => {
  return (
    <>
      <button onClick={() => document.getElementById('my_modal_2').showModal()}>
        {buttonText}
      </button>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box">{children}</div>
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

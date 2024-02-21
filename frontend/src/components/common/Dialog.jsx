const Dialog = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <button
        className="btn"
        onClick={() => document.getElementById('my_modal_2').showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box">{children}</div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Dialog;

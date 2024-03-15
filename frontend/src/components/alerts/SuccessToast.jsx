import PropTypes from 'prop-types';

const SuccessToast = ({ message }) => {
  return (
    <div className="toast toast-center z-10">
      <div className="alert alert-success">
        <span>{message}</span>
      </div>
    </div>
  );
};

SuccessToast.propTypes = {
  message: PropTypes.string,
};

export default SuccessToast;

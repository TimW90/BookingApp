import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return <p className="text-red-400 m-1 break-words">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;

import PropTypes from 'prop-types';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const SubmitButton = ({ isLoading, children, onClick }) => (
  <button
    type="submit"
    className="btn m-1"
    onClick={onClick}
    disabled={isLoading}
  >
    {isLoading ? <LoadingSpinner /> : children}
  </button>
);

export default SubmitButton;

SubmitButton.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
  onClick: PropTypes.func,
};

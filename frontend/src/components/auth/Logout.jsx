import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';

const Logout = ({ togglePopup }) => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="btn btn-outline btn-error m-1 dropdown-item "
      type="button"
      onClick={() => {
        handleLogout();
        togglePopup();
      }}
    >
      Confirm Logout
    </button>
  );
};

Logout.propTypes = {
  togglePopup: PropTypes.func,
};

export default Logout;

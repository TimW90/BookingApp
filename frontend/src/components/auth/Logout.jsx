import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';
import { usePopup } from '../popup/PopupContext';

const Logout = () => {
  const { handleLogout } = useAuth();
  const { togglePopup } = usePopup();

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

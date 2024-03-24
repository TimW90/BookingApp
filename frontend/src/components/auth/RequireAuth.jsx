import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';
import { usePopup } from '../popup/PopupContext';
import Login from './Login';

const RequireAuth = ({ children }) => {
  const { isAdmin, isLoading, user } = useAuth();
  const { setPopupContent, togglePopup } = usePopup();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    setPopupContent(<Login />);
    togglePopup();
  }

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default RequireAuth;

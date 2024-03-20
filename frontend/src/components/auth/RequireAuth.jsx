import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';

const RequireAuth = ({ children }) => {
  const { isAdmin, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/" state={{ from: location }} />;
  }
  return children;
};

RequireAuth.propTypes = {
  children: PropTypes.node,
};

export default RequireAuth;

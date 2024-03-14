import { useAuth } from './AuthProvider';

const Logout = () => {
  const { handleLogout } = useAuth();

  return (
    <button
      className="btn m-1 dropdown-item"
      type="button"
      onClick={() => handleLogout()}
    >
      Confirm Logout
    </button>
  );
};

export default Logout;

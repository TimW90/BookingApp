import { Link } from 'react-router-dom';
import Login from '../auth/Login';
import Registration from '../auth/Register';
import Logout from '../auth/Logout';
import { usePopup } from '../popup/PopupContext';
import { useAuth } from '../auth/AuthProvider';

// The dropdown menu as used in the navbar, when the profile picture in the navbar is clicked this is what shows up.
const DropDownMenu = () => {
  const { isAdmin, user } = useAuth();
  const { togglePopup, setPopupContent } = usePopup();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-circle avatar"
      >
        <div className="w-10 rounded-full">
          <img
            alt="Navbar component"
            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
          />
        </div>
      </div>

      {/* Dropdown and it's content */}
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        {/* Log in/out item in the navbar dropdown menu rendered conditionally depending on if user is logged in or not */}
        <li>
          <button
            type="button"
            onClick={() => {
              setPopupContent(
                user ? (
                  <Logout togglePopup={togglePopup} />
                ) : (
                  <Login togglePopup={togglePopup} />
                )
              );
              togglePopup();
            }}
          >
            Log {user ? 'out' : 'in'}
          </button>
        </li>

        {/* Register button */}
        {!user && (
          <li>
            <button
              type="button"
              onClick={() => {
                setPopupContent(<Registration togglePopup={togglePopup} />);
                togglePopup();
              }}
            >
              Register
            </button>
          </li>
        )}

        {/* Admin button */}
        {user && isAdmin && (
          <li>
            <Link to="/admin">Admin Dashboard</Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default DropDownMenu;

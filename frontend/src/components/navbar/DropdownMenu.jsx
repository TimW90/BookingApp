import { Link } from 'react-router-dom';
import Login from '../auth/Login';
import Registration from '../auth/Registration';
import Logout from '../auth/Logout';
import { usePopup } from '../popup/PopUpContext';
// The dropdown menu as used in the navbar, when the profile picture in the navbar is clicked this is what shows up.
const DropDownMenu = () => {
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
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li>
          <button
            type="button"
            onClick={() => {
              setPopupContent(<Login />);
              togglePopup();
            }}
          >
            Log In
          </button>
        </li>
        <li>
          <button
            type="button"
            onClick={() => {
              setPopupContent(<Logout />);
              togglePopup();
            }}
          >
            Log out
          </button>
        </li>
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
        <li>
          <Link to="/admin">Admin</Link>
        </li>
      </ul>
    </div>
  );
};

export default DropDownMenu;

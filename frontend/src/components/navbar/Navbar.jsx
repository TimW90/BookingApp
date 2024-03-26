import { Link } from 'react-router-dom';
import DropDownMenu from './DropdownMenu';
import { useAuth } from '../auth/AuthProvider';
import SuccessToast from '../alerts/SuccessToast';
import { useAlerts } from '../alerts/AlertContext';

const Navbar = () => {
  return (
    <>
      <div className="navbar bg-neutral">
        <div className="flex-1">
          <Link className="btn btn-ghost text-xl" to="/">
            Hotel Booking App
          </Link>
        </div>

        <div className="flex-none">
          <DropDownMenu />
        </div>
      </div>
    </>
  );
};

export default Navbar;

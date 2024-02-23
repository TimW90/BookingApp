import Dialog from '../components/common/Dialog';
import AddHotel from '../components/hotel/AddHotel';

const AdminPage = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        <div className="w-full p-4">
          <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
          <Dialog buttonText="Add Hotel">
            <AddHotel />
          </Dialog>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <a href="#dashboard">Dashboard</a>
          </li>
          <li>
            <a href="#users">Users</a>
          </li>
          <li>
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;

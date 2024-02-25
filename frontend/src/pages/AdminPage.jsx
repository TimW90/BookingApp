import Dialog from '../components/common/Dialog';
import ManageHotel from '../components/hotel/ManageHotel';
import HotelList from '@/components/hotel/HotelList';

const AdminPage = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="mb-4">
        <Dialog buttonText="Add Hotel">
          <ManageHotel />
        </Dialog>
      </div>

      <HotelList isAdmin />
    </>
  );
};

export default AdminPage;
